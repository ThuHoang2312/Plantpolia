import {useState} from 'react';

export const usePromoHooks = ({defaultPromoStatus}) => {
  const [promoStatus, setPromoStatus] = useState(defaultPromoStatus); //  'VIEWED' or 'NOT VIEWED'

  return {
    promoStatus: promoStatus,
    setPromoStatus: setPromoStatus,
  };
};
