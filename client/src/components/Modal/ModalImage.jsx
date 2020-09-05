import React from 'react';

import { motion } from 'framer-motion';
import './ModalImage.css';
import { useDispatch } from 'react-redux';
import { setSelectedImage } from '../../store/actions';

const ModalImage = ({ selectedImage }) => {
  const dispatch = useDispatch();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='backdrop'
      onClick={() => dispatch(setSelectedImage(''))}
    >
      <motion.img
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
        src={selectedImage}
        alt='enlarged pic'
      />
    </motion.div>
  );
};

export default ModalImage;
