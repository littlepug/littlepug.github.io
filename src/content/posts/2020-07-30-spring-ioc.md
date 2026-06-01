---
title: Spring—IOC（控制反转）
categories: study
tags: [spring, study]
keywords: spring5
excerpt: Spring 5 IOC 容器原理：BeanFactory 与 ApplicationContext、依赖注入与 Bean 生命周期配置要点。
cover: /images/covers/spring-ioc.svg
date: 2020-07-30
---

## 一、IOC容器

### 1.什么是IOC(控制反转)

a）把对象和对象之间的调用国产，交给spring进行管理

b）使用IOC目的：为了降低耦合度

### 2.IOC底层

a）xml解析、工厂模式、反射

### 3.Spring提供的IOC容器实现的两种方式（两个接口）

a） BeanFactory接口：基本上spring内部接口使用的接口，不提供给开发人员使用（加载配置文件时候不会创建对象，再获取对象时才会创建对象）

b）ApplicationContext接口：BeanFactory接口的子接口，提供更多更强大的功能，提供给开发人员使用（加载配置文件时就会把配置文件对象进行创建）

### 4.ApplicationContext接口的实现类

```plain
new ClassPathXmlApplicationContext()
new FileSystemXmlApplicationContext()
```

## 二、IOC容器—Bean管理

> Bean管理的两个操作：a）Spring 创建对象 b）Spring注入属性

### 1.基于XML方式

#### 1.1）创建对象

```xml
<!--1 配置User对象创建-->
<bean id="user" class="com.atguigu.spring5.User"></bean>
```

#### 1.2）注入属性（DI:依赖注入）

##### i）set方式

```java
//（1）传统方式： 创建类，定义属性和对应的set方法
public class Book {
    //创建属性
    private String bname;
    //创建属性对应的set方法
    public void setBname(String bname) {
            this.bname = bname;
            }
}
```

---

```xml
<!--（2）spring方式： set方法注入属性-->
<bean id="book" class="com.atguigu.spring5.Book">
    <!--使用property完成属性注入
            name：类里面属性名称
            value：向属性注入的值
    -->
    <property name="bname" value="Hello"></property>
    <property name="bauthor" value="World"></property>
</bean>
```

##### ii）有参构造函数注入

```java
//（1）传统方式：创建类，构建有参函数
public class Orders {
    //属性
    private String oname;
    private String address;
    //有参数构造
    public Orders(String oname,String address) {
            this.oname = oname;
            this.address = address;
    }
}
```

---

```xml
<!--（2）spring方式：有参数构造注入属性-->
<bean id="orders" class="com.atguigu.spring5.Orders">
    <constructor-arg name="oname" value="Hello"></constructor-arg>
    <constructor-arg name="address" value="China！"></constructor-arg>
</bean>
```

##### iii） p名称空间注入

```xml
<!--1、添加p名称空间在配置文件头部-->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:p="http://www.springframework.org/schema/p"        <!--在这里添加一行p-->
<!--2、在bean标签进行属性注入（算是set方式注入的简化操作）-->
<bean id="book" class="com.atguigu.spring5.Book" p:bname="very" p:bauthor="good">
</bean>
```

#### 1.3）注入空置和特殊符号

```xml
<bean id="book" class="com.atguigu.spring5.Book">
<!--（1）null值-->
<property name="address">
    <null/><!--属性里边添加一个null标签-->
</property>
<!--（2）特殊符号赋值-->
<!--属性值包含特殊符号
    a 把<>进行转义 &lt; &gt;
    b 把带特殊符号内容写到CDATA
-->
    <property name="address">
                <value><![CDATA[<<南京>>]]></value>
    </property>
</bean>
```

#### 1.4）注入属性—外部Bean

##### i）创建两个类service和dao类

```java
public class UserService {//service类
    //创建UserDao类型属性，生成set方法
    private UserDao userDao;
    public void setUserDao(UserDao userDao) {
            this.userDao = userDao;
    }
    public void add() {
            System.out.println("service add...............");
            userDao.update();//调用dao方法
    }
}
public class UserDaoImpl implements UserDao {//dao类
    @Override
    public void update() {
            System.out.println("dao update...........");
    }
}
```

##### ii） 在spring配置文件中进行配置

```xml
<!--1 service和dao对象创建-->
<bean id="userService" class="com.atguigu.spring5.service.UserService">
    <!--注入userDao对象
            name属性：类里面属性名称
            ref属性：创建userDao对象bean标签id值
    -->
    <property name="userDao" ref="userDaoImpl"></property>
</bean>
<bean id="userDaoImpl" class="com.atguigu.spring5.dao.UserDaoImpl"></bean>
```

#### **1.5）基于XML方式注入内部bean和级联赋值**

##### i） 注入属性-内部bean

> 1.一对多关系：部门和员工，一个部门有多个员工，一个员工属于一个部门（部门是一，员工是多）
> 2.在实体类之间表示一对多关系，员工表示所属部门，使用对象类型属性进行表示

---

```java
//部门类
public class Dept {
    private String dname;
    public void setDname(String dname) {
            this.dname = dname;
    }
}
//员工类
public class Emp {
    private String ename;
    private String gender;
    //员工属于某一个部门，使用对象形式表示
    private Dept dept;

    public void setDept(Dept dept) {
            this.dept = dept;
    }
    public void setEname(String ename) {
            this.ename = ename;
    }
    public void setGender(String gender) {
            this.gender = gender;
    }
}
```

> 在spring配置文件中配置

---
```xml

<!--内部bean-->

<bean id="emp" class="com.atguigu.spring5.bean.Emp">
    <!--设置两个普通属性-->
    <property name="ename" value="Andy"></property>
    <property name="gender" value="女"></property>
    <!--设置对象类型属性-->
    <property name="dept">
        <bean id="dept" class="com.atguigu.spring5.bean.Dept"><!--内部bean赋值-->
            <property name="dname" value="宣传部门"></property>
        </bean>
    </property>
</bean>

```
##### ii) 注入属性-级联赋值

```xml
<!--方式一：级联赋值-->
<bean id="emp" class="com.atguigu.spring5.bean.Emp">
    <!--设置两个普通属性-->
    <property name="ename" value="Andy"></property>
    <property name="gender" value="女"></property>
    <!--级联赋值-->
    <property name="dept" ref="dept"></property>
</bean>
<bean id="dept" class="com.atguigu.spring5.bean.Dept">
    <property name="dname" value="公关部门"></property>
</bean>
```

---

```java
//方式二：生成dept的get方法（get方法必须有！！）
public Dept getDept() {
        return dept;
}
```

---

```xml
<!--级联赋值-->
<bean id="emp" class="com.atguigu.spring5.bean.Emp">
    <!--设置两个普通属性-->
    <property name="ename" value="jams"></property>
    <property name="gender" value="男"></property>
    <!--级联赋值-->
    <property name="dept" ref="dept"></property>
    <property name="dept.dname" value="技术部门"></property>
</bean>
<bean id="dept" class="com.atguigu.spring5.bean.Dept">
</bean>
```

#### 1.6) **IOC 操作 Bean 管理——xml 注入集合属性**

> 1、注入数组类型属性 2、注入 List 集合类型属性 3、注入 Map 集合类型属性

---

```java
//（1）创建类，定义数组、list、map、set 类型属性，生成对应 set 方法
public class Stu {
    //1 数组类型属性
    private String[] courses;
    //2 list集合类型属性
    private List<String> list;
    //3 map集合类型属性
    private Map<String,String> maps;
    //4 set集合类型属性
    private Set<String> sets;
    public void setSets(Set<String> sets) {
        this.sets = sets;
    }
    public void setCourses(String[] courses) {
        this.courses = courses;
    }
    public void setList(List<String> list) {
        this.list = list;
    }
    public void setMaps(Map<String, String> maps) {
        this.maps = maps;
    }
```

---

```xml
<!--（2）在 spring 配置文件进行配置-->
<bean id="stu" class="com.atguigu.spring5.collectiontype.Stu">
    <!--数组类型属性注入-->
    <property name="courses">
        <array>
            <value>java课程</value>
            <value>数据库课程</value>
        </array>
    </property>
    <!--list类型属性注入-->
    <property name="list">
        <list>
            <value>张三</value>
            <value>小三</value>
        </list>
    </property>
    <!--map类型属性注入-->
    <property name="maps">
        <map>
            <entry key="JAVA" value="java"></entry>
            <entry key="PHP" value="php"></entry>
        </map>
    </property>
    <!--set类型属性注入-->
    <property name="sets">
        <set>
            <value>MySQL</value>
            <value>Redis</value>
        </set>
    </property>
</bean>
```

#### 1.7) **在集合里面设置对象类型值**

```java
//学生所学多门课程
    private List<Course> courseList;//创建集合
    public void setCourseList(List<Course> courseList) {
        this.courseList = courseList;
    }
```

---

```xml
<!--创建多个course对象-->
<bean id="course1" class="com.atguigu.spring5.collectiontype.Course">
    <property name="cname" value="Spring5框架"></property>
</bean>
<bean id="course2" class="com.atguigu.spring5.collectiontype.Course">
    <property name="cname" value="MyBatis框架"></property>
</bean>

<!--注入list集合类型，值是对象-->
<property name="courseList">
    <list>
        <ref bean="course1"></ref>
        <ref bean="course2"></ref>
    </list>
</property>
```

---

```xml
<!--第一步：在 spring 配置文件中引入名称空间 util-->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:util="http://www.springframework.org/schema/util" <!--添加util名称空间-->
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd">     <!--添加util名称空间-->

<!--第二步：使用 util 标签完成 list 集合注入提取-->
<!--把集合注入部分提取出来-->
<!--1 提取list集合类型属性注入-->
<util:list id="bookList">
    <value>易筋经</value>
    <value>九阴真经</value>
    <value>九阳神功</value>
</util:list>

<!--2 提取list集合类型属性注入使用-->
<bean id="book" class="com.atguigu.spring5.collectiontype.Book" scope="prototype">
    <property name="list" ref="bookList"></property>
</bean>
```

### 2.、 IOC容器-Bean管理——基于XML（续集）

#### 2.1. **IOC 操作 Bean 管理（FactoryBean）**

> 1、Spring 有两种类型 bean，一种普通 bean，另外一种工厂 bean（FactoryBean）
>
> 2、普通 bean：在配置文件中定义 bean 类型就是返回类型
>
> ​3、工厂 bean：在配置文件定义 bean 类型可以和返回类型不一样    第一步 创建类，让这个类作为工厂 bean，实现接口 FactoryBean 第二步 实现接口里面的方法，在实现的方法中定义返回的 bean 类型

---

```java
public class MyBean implements FactoryBean<Course> {
    //定义返回bean
    @Override
    public Course getObject() throws Exception {
            Course course = new Course();
            course.setCname("abc");
            return course;
    }
}
```

---

```xml
<bean id="myBean" class="com.atguigu.spring5.factorybean.MyBean"></bean>
```

---

```java
@Test
public void test3() {
    ApplicationContext context =
    new ClassPathXmlApplicationContext("bean3.xml");
    Course course = context.getBean("myBean", Course.class);//返回值类型可以不是定义的bean类型！
    System.out.println(course);
}
```

#### **2.2.IOC 操作 Bean 管理（bean 作用域）**

在 Spring 里面，默认情况下，bean 是单实例对象，下面进行作用域设置：

> 1）在 spring 配置文件 bean 标签里面有属性（scope）用于设置单实例还是多实例
> 2）scope 属性值 第一个值 默认值，singleton，表示是单实例对象 第二个值 prototype，表示是多实例对象

---

```xml
<bean id="book" class="com.atguigu.spring5.collectiontype.Book" scope="prototype"><!--设置为多实例-->
    <property name="list" ref="bookList"></property>
</bean>
```

---

> 3）singleton 和 prototype 区别：
> a）singleton 单实例，prototype 多实例；
> b）设置 scope 值是 singleton 时候，加载 spring 配置文件时候就会创建单实例对象    ；设置 scope 值是 prototype 时候，不是在加载 spring 配置文件时候创建对象，在调用 getBean 方法时候创建多实例对象

---

#### 2.3. **IOC 操作 Bean 管理（bean 生命周期）**

> 1.生命周期：从对象创建到对象销毁的过程
> 2.bean生命周期
> （1）通过构造器创建bean实例（无参数构造）
> （2）为bean的属性设置值和对其他bean引用（调用set方法）
> （3）调用bean的初始化方法（需要进行配置初始化的方法）
> （4）bean可以使用了（对象获取到了）
> （5）当容器关闭的时候，调用bean的销毁方法（需要进行配置销毁的方法）
> 3.演示bean生命周期

---

```java
public class Orders {
    //无参数构造
    public Orders() {
    System.out.println("第一步 执行无参数构造创建 bean 实例");
    }
    private String oname;
    public void setOname(String oname) {
    this.oname = oname;
    System.out.println("第二步 调用 set 方法设置属性值");
    }
    //创建执行的初始化的方法
    public void initMethod() {
    System.out.println("第三步 执行初始化的方法");
    }
    //创建执行的销毁的方法
    public void destroyMethod() {
    System.out.println("第五步 执行销毁的方法");
    }
}
```

---

```java
public class MyBeanPost implements BeanPostProcessor {//创建后置处理器实现类
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("在初始化之前执行的方法");
        return bean;
    }
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("在初始化之后执行的方法");
        return bean;
    }
}
```

---

```xml
<!--配置文件的bean参数配置-->
<bean id="orders" class="com.atguigu.spring5.bean.Orders" init-method="initMethod" destroy-method="destroyMethod">    <!--配置初始化方法和销毁方法-->
    <property name="oname" value="手机"></property><!--这里就是通过set方式（注入属性）赋值-->
</bean>
<!--配置后置处理器-->
<bean id="myBeanPost" class="com.atguigu.spring5.bean.MyBeanPost"></bean>
```

---

```java
@Test
public void testBean3() {
    // ApplicationContext context =
    // new ClassPathXmlApplicationContext("bean4.xml");
    ClassPathXmlApplicationContext context =
    new ClassPathXmlApplicationContext("bean4.xml");
    Orders orders = context.getBean("orders", Orders.class);
    System.out.println("第四步 获取创建 bean 实例对象");
    System.out.println(orders);
    //手动让 bean 实例销毁
    context.close();
}
```

> 4.bean的后置处理器，bean的生命周期有7步（正常的有5步，而后置的有7步）
>
> （1）通过构造器创建 bean 实例（无参数构造）
>
> （2）为 bean 的属性设置值和对其他 bean 引用（调用 set 方法）
>
> （3）把 bean 实例传递 bean 后置处理器的方法 postProcessBeforeInitialization
>
> （4）调用 bean 的初始化的方法（需要进行配置初始化的方法）
>
> （5）把 bean 实例传递 bean 后置处理器的方法 postProcessAfterInitialization
>
> （6）bean 可以使用了（对象获取到了）
>
> （7）当容器关闭时候，调用 bean 的销毁的方法（需要进行配置销毁的方法）

---

#### 2.4. **IOC 操作 Bean 管理(外部属性文件)**

> 方式一：直接配置数据库信息    ：
> （1）配置Druid（德鲁伊）连接池 （2）引入Druid（德鲁伊）连接池依赖 jar 包

---
```xml

<!--直接配置连接池-->

<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"></property>
    <property name="url" value="jdbc:mysql://localhost:3306/userDb"></property>
    <property name="username" value="root"></property>
    <property name="password" value="root"></property>
</bean>

```

---


>方式二：引入外部属性文件配置数据库连接池
>（1）创建外部属性文件，properties 格式文件，写数据库信息（jdbc.properties）
```yml
prop.driverClass=com.mysql.jdbc.Driver
prop.url=jdbc:mysql://localhost:3306/userDb
prop.userName=root
prop.password=root
```

---

> （2）把外部 properties 属性文件引入到 spring 配置文件中 —— 引入 context 名称空间

---

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                                                        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd"><!--引入context名称空间-->
    <!--引入外部属性文件-->
    <context:property-placeholder location="classpath:jdbc.properties"/>
    <!--配置连接池-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${prop.driverClass}"></property>
        <property name="url" value="${prop.url}"></property>
        <property name="username" value="${prop.userName}"></property>
        <property name="password" value="${prop.password}"></property>
    </bean>
</beans>
```

### 3. IOC 操作 Bean 管理( 基于注解方式 )

#### 3.1.什么是注解

1. 注解是代码的特殊标记，格式：@注解名称（属性名称=属性值，属性名称=属性值。。。）
2. 使用注解，注解作用在类上面，方法上面，属性上面
3. 使用注解的目的：简化xml配置

   #### 3.2.Spring针对Bean管理中创建对象提供注解

下面四个注解功能是一样的，都可以用来创建bean实例

1. @Component
2. @Service
3. @Controller
4. @Repository

   #### 3.3.基于注解方式实现对象创建

第一步 引入依赖（引入spring-aop jar包）

第二步 开启组件扫描

```xml
<!--开启组件扫描
    1 如果扫描多个包，多个包使用逗号隔开
    2 扫描包上层目录
-->
<context:component-scan base-package="com.atguigu"></context:component-scan>
```

---

第三步 创建类，在类上面添加创建对象注解

---

```java
//在注解里面 value 属性值可以省略不写，
//默认值是类名称，首字母小写
//UserService -- userService
@Component(value = "userService") //注解等同于XML配置文件：<bean id="userService" class=".."/>
public class UserService {
    public void add() {
    System.out.println("service add.......");
    }
}
```

#### 3.4.开启组件扫描配置

```xml
<!--示例 1
    use-default-filters="false" 表示现在不使用默认 filter，自己配置 filter
    context:include-filter ，设置扫描哪些内容
-->
<context:component-scan base-package="com.atguigu" use-defaultfilters="false">
    <context:include-filter type="annotation"

expression="org.springframework.stereotype.Controller"/><!--代表只扫描Controller注解的类-->
</context:component-scan>
<!--示例 2
    下面配置扫描包所有内容
    context:exclude-filter： 设置哪些内容不进行扫描
-->
<context:component-scan base-package="com.atguigu">
    <context:exclude-filter type="annotation"

expression="org.springframework.stereotype.Controller"/><!--表示Controller注解的类之外一切都进行扫描-->
</context:component-scan>
```

#### 3.5. **基于注解方式实现属性注入**

1）@Autowired：根据属性类型进行自动装配

第一步 把 service 和 dao 对象创建，在 service 和 dao 类添加创建对象注解

第二步 在 service 注入 dao 对象，在 service 类添加 dao 类型属性，在属性上面使用注解

---

```java
@Service
public class UserService {
    //定义 dao 类型属性
    //不需要添加 set 方法
    //添加注入属性注解
    @Autowired
    private UserDao userDao;
    public void add() {
    System.out.println("service add.......");
    userDao.add();
    }
}

//Dao实现类
@Repository
//@Repository(value = "userDaoImpl1")
public class UserDaoImpl implements UserDao {
    @Override
    public void add() {
        System.out.println("dao add.....");
    }
}
```

---

2）@Qualifier：根据名称进行注入，这个@Qualifier 注解的使用，和上面@Autowired 一起使用

```java
//定义 dao 类型属性
//不需要添加 set 方法
//添加注入属性注解
@Autowired //根据类型进行注入
//根据名称进行注入（目的在于区别同一接口下有多个实现类，根据类型就无法选择，从而出错！）
@Qualifier(value = "userDaoImpl1")
private UserDao userDao;
```

---

3）@Resource：可以根据类型注入，也可以根据名称注入（它属于javax包下的注解，不推荐使用！）

```java
//@Resource //根据类型进行注入
@Resource(name = "userDaoImpl1") //根据名称进行注入
private UserDao userDao;
```

---

4）@Value：注入普通类型属性

```java
@Value(value = "abc")
private String name
```

#### 3.6.完全注解开发

1）创建配置类，替代 xml 配置文件

```java
@Configuration //作为配置类，替代 xml 配置文件
@ComponentScan(basePackages = {"com.atguigu"})
public class SpringConfig {

}
```

---

2）编写测试类

```java
@Test
public void testService2() {
    //加载配置类
    ApplicationContext context
    = new AnnotationConfigApplicationContext(SpringConfig.class);
    UserService userService = context.getBean("userService",
UserService.class);
    System.out.println(userService);
    userService.add();
}
```
