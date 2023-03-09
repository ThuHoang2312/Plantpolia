import {useState} from 'react';
import {useLogger} from '../services/useLogger';

export const usePromoHooks = ({defaultPromoStatus}) => {
  const {log} = useLogger('usePromoHooks');

  const [promoStatus, setPromoStatus] = useState(defaultPromoStatus); //  'VIEWED' or 'NOT VIEWED'

  return {
    promoStatus: promoStatus,
    setPromoStatus: setPromoStatus,
  };
};
