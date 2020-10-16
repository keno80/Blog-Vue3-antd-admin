import {Avatar, Button, Col, Divider, Dropdown, Input, Layout, Menu, Modal,Pagination, Select, Radio, Row, Tag, Table} from "ant-design-vue";

const antd = {
  install: (app => {
    app.use(Avatar)
    app.use(Button)
    app.use(Col)
    app.use(Divider)
    app.use(Dropdown)
    app.use(Input)
    app.use(Layout)
    app.use(Menu)
    app.use(Modal)
    app.use(Pagination)
    app.use(Select)
    app.use(Radio)
    app.use(Row)
    app.use(Tag)
    app.use(Table)
  })
}

export default antd