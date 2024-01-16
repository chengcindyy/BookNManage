export function createData(service, prices, range, servicePackage, includePerTime, additionalData = []) {
    let rangeData = null;
    let packageData = null;
    
    
    if (range) {
      rangeData = [];
      rangeData.push(
        { price: prices[0], time: '30 min' },
        { price: prices[1], time: '45 min' },
        { price: prices[2], time: '60 min' },
        { price: prices[3], time: '90 min' }
      );
      rangeData.push(...additionalData);
    }
  
    if (includePerTime) {
      rangeData = [];
      rangeData.push({ price: prices[4], time: 'Per times' });
      rangeData.push(...additionalData);
    }

    
    if (servicePackage) {
        rangeData = [];
        packageData = [
          { price: prices[0], package: '10 sessions ($58)' },
          { price: prices[1], package: '21 sessions ($56)' },
          { price: prices[2], package: '32 sessions ($54)' }
        ];
    }
    
    return {
      service,
      prices,
      range: rangeData,
      servicePackage: packageData,      
    };
}
