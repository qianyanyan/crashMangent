export default {
  judgePermissionName (value, list) {
    if (list.length == 0) {
      list = localStorage.getItem('permissionName')
    }
    if (typeof list == 'string') {
      list = list.split(',')
    }
    let blag = false
    for (let i in list) {
      if (value.indexOf(list[i]) != -1) {
        blag = true
        break
      }
    }
    return blag
  },
  // 是否标签
  istags (str) {
    let flag = true
    let reg = str.split(';')
    reg = reg.filter(function (el, index, array) { return el != '' })
    if (reg.length > 3) {
      flag = false
    } else {
      for (var i = 0; i < reg.length; i++) {
        if (reg[i].length > 5) {
          flag = false
          break
        }
      }
    }
    return flag
  },
  // 分页
  fPage (list, currentPage, pageSize) {
    if (list != undefined) {
      return list.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize)
    }
  },
  // 替换表格控制显示内容
  replaceCellInfo (list, replaceTo) {
    for (let i = 0; i < list.length; i++) {
      for (let key in list[i]) {
        if (list[i][key] == undefined || String(list[i][key]) == '') {
          list[i][key] = replaceTo
        }
      }
    }
    return list
  },
  // 替换表格控制显示内容
  replaceObject (list, replaceTo) {
    // for (let i = 0; i < list.length; i++) {
    //   for (let key in list[i]) {
    //     if (list[i][key] == undefined || String(list[i][key]) == '') {
    //       list[i][key] = replaceTo
    //     }
    //   }
    // }
    for (var key in list) {
      if (list[key] == undefined || list[key] == '') {
        list[key] = replaceTo
      }
    }
    return list
  },
  // 时间戳转日期时间格式 yyyy-mm-dd hh:mm:ss
  formatTime (timestamp) {
    if (timestamp != undefined && timestamp != '--') {
      if (typeof timestamp == 'string') {
        timestamp = new Date(Date.parse(timestamp.replace(/-/g, '/')))
      }
      if (typeof timestamp == 'number') {
        timestamp = new Date(timestamp)
      }
      let year = timestamp.getFullYear()
      let month = this.formatAdd(timestamp.getMonth() + 1)
      let date = this.formatAdd(timestamp.getDate())
      let hour = this.formatAdd(timestamp.getHours())
      let minute = this.formatAdd(timestamp.getMinutes())
      let second = this.formatAdd(timestamp.getSeconds())
      return year + '-' + month + '-' + date + '  ' + hour + ':' + minute + ':' + second
    }
  },
  // 日期格式添0至两位数方法
  formatAdd (num) {
    return Number(num) < 10 ? '0' + num : num
  }
  // arrayToJson(formArray){
  //   var dataArray = {};
  //   $.each(formArray,function(){
  //     if(dataArray[this.name]){
  //       if(!dataArray[this.name].push){
  //         dataArray[this.name] = [dataArray[this.name]];
  //       }
  //       dataArray[this.name].push(this.value || '');
  //     }else{
  //       dataArray[this.name] = this.value || '';
  //     }
  //   });
  //   return JSON.stringify(dataArray);
  // }
}

