import React from 'react';
import { toast } from 'react-toastify';

export const showToast = (message, type) => {
  return toast[type](
    <>
      {type === 'error' ? (
        <>
          <i class='fas fa-exclamation-circle'></i>
        </>
      ) : (
        <i class='fas fa-check'></i>
      )}
      &nbsp;{message}
    </>,

    {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );
};
