
const useChangeListener = () => {

  const onChangeText = (e, getter, setter) => {
    const name = e.target.name;
    const value = e.target.value;

    setter({...getter, [name]: value})
  }

  const onChangeNumber = () => {

  }

  return {onChangeText, onChangeNumber}
}

export default useChangeListener;