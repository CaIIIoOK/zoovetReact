import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  Main,
  Categorys,
  DeliveryInfo,
  Contacts,
  Error,
  SidebarMenu,
  Goods,
  Order,
  Registration,
  Conditions,
  UserLogin,
  MyOffice,
  Search,
  ArrowTop,
  SingleGoods,
  AdminChangeCategory,
  AdminGoods,
  PrintVersion,
} from '../components';

const Container = () => {
  return (
    <div className="container">
      <SidebarMenu />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/categorys" element={<Categorys />} />
        <Route path="/goods" element={<Goods />} />
        <Route path="/goods-solo" element={<SingleGoods />} />
        <Route path="/delivery_info" element={<DeliveryInfo />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/order" element={<Order />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route exact path="/my-office" element={<MyOffice />} />
        <Route exact path="/admin-change-prod-all" element={<AdminChangeCategory />} />
        <Route exact path="/admin-goods" element={<AdminGoods />} />
        <Route path="/search" element={<Search />} />
        <Route path="/print-version" element={<PrintVersion />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ArrowTop />
    </div>
  );
};

export default Container;
