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
} from '../components';

const Container = () => {
  return (
    <div className="container">
      <SidebarMenu />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/categorys" element={<Categorys />} />
        <Route path="/goods" element={<Goods />} />
        <Route path="/delivery_info" element={<DeliveryInfo />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/order" element={<Order />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/my-office" element={<MyOffice />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Container;
