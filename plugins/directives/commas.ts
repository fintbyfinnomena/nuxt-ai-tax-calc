export default {
    mounted(el:any) {
      const formatNumber = (value:any) => {
        if (!value) return '';
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      };
  
      const unformatNumber = (value:any) => {
        return value.replace(/,/g, '');
      };
  
      el.addEventListener('input', (e:any) => {
        const unformattedValue = unformatNumber(e.target.value);
        const formattedValue = formatNumber(unformattedValue);
        el.value = formattedValue;
        // el.dispatchEvent(new Event('input')); // Dispatch input event to update v-model
      });
  
      el.value = formatNumber(el.value); // Initial formatting
    }
  };