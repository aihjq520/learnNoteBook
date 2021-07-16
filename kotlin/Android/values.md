### Values目录下各个文件夹的作用

#### strings.xml
定义一些需要在开发中使用的字符串变量和数组，用来实现国际化，使用方法分别为：R.string.自己命名的名称、@string/自己命名的名称。

```
<resources>
        <!--属性name="自己命名的名称"-->
    <string name="app_name">Android4.0</string>
    <string_array name="ball">
        <item name="basketball">篮球</item>
        <item name="soccer">足球</item>
</resources>
```

使用举例：
在xxx.java文件中使用方法：getResource().getString(R.string.app_name);

在xxx.xml文件中使用方法：android：text=“@string/app_name”


#### colors.xml
主要存放一些自定义的颜色，使用方法同上。


#### dimens.xml
主要定义一些尺寸，使用方法同上。

#### styles.xml
放置样式的文件，可以使自己定义的样式，也可存放法系统的样式，样式可以应用用在窗口、控件、布局、主题设置中，但是必须与控件（View）的属性保持一致。定义样式分为两种：

格式一：
```
<style name="定义当前的样式/主题的名称(主要用于引用)">
    <item name="属性名称">属性值</item>
</style>
```
在xxx.xml文件中使用方法：android：style=“@style/mystyle”

在清单文件中使用：
```
<application 
    theme="@style/mystyle"
    ...>
    ...
</application>

```