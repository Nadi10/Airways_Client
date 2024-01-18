import React, { FC } from "react";
import Header from "components/header";

const FlightsPage: FC = () => {
  return (
    <><Header pages={['Orders', 'History']} isAdmin={false} />
      <OrdersRoutes />
    </>
  );
};

export default FlightsPage;
