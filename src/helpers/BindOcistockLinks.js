
export const GetDataFromLink = (keyword) => {
    const pattern =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    if (pattern.test(keyword)) {
        console.log("test123")

      if (/1688/.test(keyword)) {
        const split = keyword.split("?");
        const url = split[0].split("/");
        const idProduct = url.pop().split(".")[0];
        console.log("test1")
        return {
            toko : "1688",
            id : idProduct
        };
      }
  
      if (/taobao/.test(keyword) || /tmall/.test(keyword)) {
        if (/ocistok/.test(keyword)) {
          const split = keyword.split("?");
          const url = split[0].split("/");
          const idProduct = url.pop().split(".")[0];
  
          return {
            toko : "taobao",
            id : idProduct
          };
        } else {
          const split = keyword.match(/[\\?|\\&]id=([^&]*)/);
          if (split === null) {
            const url = keyword.split("/");
            const idProduct = url.pop().split(".")[0];
  
            return {
                toko : "taobao",
                id : idProduct
            };
          } else {
            return {
                toko : "taobao",
                id : split[1]
            };
          }
        }
      }
  
      if (/m.alibaba/.test(keyword)) {
        const split = keyword.split("/");
        const idProduct = split[4];
  
        return {
            toko : "alibaba",
            id : idProduct
        };
      }
  
      if (/indonesian.alibaba/.test(keyword)) {
        const split = keyword.split("?");
        const url = split[0].split("/");
        const productName = url.pop().split(".");
        const splitProductName = productName[productName.length - 2];
        const idProduct = splitProductName.split('-').pop();
  
        return {
            toko : "alibaba",
            id : idProduct
        };
      }
  
      if (/alibaba/.test(keyword)) {
        const split = keyword.split("?");
        const url = split[0].split("/");
        const productName = url.pop().split(".")[0];
        const splitProductName = productName.split(/[_-]/);
        const idProduct = splitProductName.pop();
  
        return {
            toko : "alibaba",
            id : idProduct
        };
      }
    }
    return {
        toko : null,
        id : null
    };
  }
  