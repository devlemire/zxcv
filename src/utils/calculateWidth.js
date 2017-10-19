export default ( percentage, parentWidth ) => {
  return Math.floor( parentWidth * ( percentage / 100 ) ) + 'px';
};