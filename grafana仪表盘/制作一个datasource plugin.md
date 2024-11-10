### 1. 创建模板

```javascript
npx @grafana/create-plugin@latest
```


### datasource plugin

datasource 必须继承 DatasourceApi interface, 然后要实现两个方法分别是， **query**, **testDataSource**


### query方法

query方法是在datasource plugin中最重要的，此方法定于了如何返回数据，以及如何对数据进行格式化输出

```TS
async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse>
```

options包含了查询语句，或者用户配置的数据，还有一些上下文信息，例如时间，刷新间隔等等。利用这些数据能帮助我们去查询外部数据。

### 定义query类型

query类型定义了用户的输入类型，需要继承grafana内置的Dataquery

```JS
export interface MyQuery extends DataQuery {
  queryText?: string;
  constant: number;
  frequency: number;
}
```

### form表单绑定model

上一步定义的Myquery可以从querty-editor组件的props拿到，

src/components/QueryEditor.tsx

```JS
const { queryText, constant, frequency } = query;
<InlineField label="Frequency" labelWidth={16}>
  <Input onChange={onFrequencyChange} value={frequency || ''} />
</InlineField>;
```

然后绑定表单的onChange事件

```JS
const onFrequencyChange = (event: ChangeEvent<HTMLInputElement>) => {
  onChange({ ...query, frequency: parseFloat(event.target.value) });
  // executes the query
  onRunQuery();
};
```

onChange和onRunQuery方法比较重要，其中

onChange方法将会更新grafana数据库存储的query数据，以便保存后回显数据
onRunQuery告诉grafana去调用一次查询数据的函数，最好在每次改变query就调用一次


### config-edtior

就像query-editor一样，config-editor表单所绑定的值发生变化的时候，也要重新触发一次更新函数。

src/components/ConfigEditor.tsx

```JS
<InlineField label="Resolution" labelWidth={12}>
  <Input onChange={onResolutionChange} value={jsonData.resolution || ''} placeholder="Enter a number" width={40} />
</InlineField>
```

添加监听函数

```JS
const onResolutionChange = (event: ChangeEvent<HTMLInputElement>) => {
  const jsonData = {
    ...options.jsonData,
    resolution: parseFloat(event.target.value),
  };
  onOptionsChange({ ...options, jsonData });
};
```

### 使用option

定义了config-editor之后我们可以在DataSource Api使用，

```JS
export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  resolution: number;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);

    this.resolution = instanceSettings.jsonData.resolution || 1000.0;
  }
  // ...
```


如果要开发一个插件建议还是直接参考grafana官仓的example例子。 我们主要是学习它的目录结构，以及文件的作用



### 参考

https://grafana.com/developers/plugin-tools/tutorials/build-a-data-source-plugin

https://github.com/grafana/grafana-plugin-examples/blob/main/examples/datasource-basic/src/components/QueryEditor/QueryEditor.tsx