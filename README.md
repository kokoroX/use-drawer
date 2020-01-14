## useDrawer

列表数据维护工具

### 使用
```js
const transformerApi: UseDrawerApi<{ name: string }> = async (pagination, params) => {
  const res = await mockApi();
  return { list: res.content, total: res.total };
}

const [state, toolkit] = useDrawer(transformerApi);
const pagination = usePagination(state, toolkit);

// 搜索
toolkit.search({ name: 'test' })

// 刷新
toolkit.refresh()

// 改变每页数据大小
// (pageSize: number) => void
toolkit.changePageSize(10)

// 清空查询条件
toolkit.clearParams();

// 读取下一页 一般在手机端使用
toolkit.loadMore();

// 清空数据列表
toolkit.clearList();

// 不改变查询条件 直接刷新

// 设置数据列表
// 只有列表页直接编辑时会使用
// (list: I[]) => void;
toolkit.setList();

// 页码跳转
toolkit.jumpPage(2);
```