import 'antd/dist/antd.css';

import { Table } from 'antd';
import React, { useEffect } from 'react';
import useDrawer, { UseDrawerApi, usePagination } from 'use-drawer';

import styles from './App.less';

const delay = (time = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  })
}

const mockApi = async ({ pageSize }) => {
  await delay();
  const content = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }];
  return { content: content.slice(0, pageSize), total: 3 };
}

const transformerApi: UseDrawerApi<{ name: string }> = async (pagination, params: { name: string }) => {
  const res = await mockApi({ ...pagination });
  return { list: res.content, total: res.total };
}

const App = () => {
  const [state, toolkit] = useDrawer(transformerApi);
  const pagination = usePagination(state, toolkit);
  useEffect(() => {
    toolkit.search({ name: '123' });
  }, []);

  const columns = [
    { title: 'id', dataIndex: 'id' },
    { title: 'name', dataIndex: 'name' },
  ];

  return (
    <div className={styles.app}>
      <Table rowKey="id" columns={columns} dataSource={state.list} loading={state.loading} pagination={pagination} />
    </div>
  )
}

export default App;