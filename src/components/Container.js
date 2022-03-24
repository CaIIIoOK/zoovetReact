import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Main, Categorys, DeliveryInfo, Contacts, Error, SidebarMenu } from '../components';

const Container = () => {
  return (
    <div className="container">
      <SidebarMenu />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/categorys" element={<Categorys />} />
        <Route path="/delivery_info" element={<DeliveryInfo />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Container;
