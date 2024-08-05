// src/hooks/useRoleRedirect.js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const roleHomePaths = {
  Faculty: '/faculty',
  HOD: '/hod',
  Principal: '/principal'
};

const useRoleRedirect = (allowedRoles) => {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (role && !allowedRoles.includes(role)) {
      const homePath = roleHomePaths[role] || '/login';
      navigate(homePath, { replace: true });
    }
  }, [role, allowedRoles, navigate]);
};

export default useRoleRedirect;
