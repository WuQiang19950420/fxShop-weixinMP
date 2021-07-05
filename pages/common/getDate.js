	function getDay(){
		let date = new Date()
		let dates = {
			year:date.getFullYear(),
			month:date.getMonth(),
			day:date.getDate(),
			week:date.getDay()
		}
		return dates
	}
	//获取上个月的天数
	function lastMonthDay(year,month){
		let day = new Date(year, month, 0).getDate();
		return day;
	}
	function formatDate(date){
		  let myyear = date.getFullYear();
		  let mymonth = date.getMonth() + 1;
		  let myweekday = date.getDate();
		  if (mymonth < 10) {
			mymonth = "0" + mymonth;
		  }
		  if (myweekday < 10) {
			myweekday = "0" + myweekday;
		  }
		  return myyear + "-" + mymonth + "-" + myweekday;
	}
	
	//今日日期
	export function getToday(){
		let dates = getDay()
		let today = new Date()
		return formatDate(today)
	}
	//这周起始日期
	export function weekToday(){
		let dates = getDay()
		let today = new Date(dates.year,dates.month,(dates.day - (dates.week - 1)))
		return formatDate(today)
	}
	//当天七天后日期
	export function todayweekToday(){
		let dates = getDay();
		let today = null;
		if(dates.day < 6){
			if(dates.month <= 0){
				let lastMonthDays = lastMonthDay(dates.year - 1,12);
				let days = 6 - dates.day;
				let lastDays = lastMonthDays - days;
				today = new Date(dates.year - 1,12,lastDays);
			}else{
				let lastMonthDays = lastMonthDay(dates.year,(dates.month + 1) - 1)
				let days = 6 - dates.day;
				let lastDays = lastMonthDays - days;
				today = new Date(dates.year,(dates.month - 1),lastDays);
			}
			return formatDate(today);
		}else{
			today = new Date(dates.year,dates.month,(dates.day - 6));
			return formatDate(today);
		}
	}
	//n个月的
	export function moreMonthToday(month){
		let dates = getDay();
		let count = (dates.month + 1) - month;
		if(count < 1){						//判断月份是否小于1 如果小于1 就重置成12 再减去相应的count数
			dates.year = dates.year - 1;
			dates.month = 11 - count;
			let today = new Date(dates.year,dates.month,1);
			return formatDate(today)
		}
		else{
			let today = new Date(dates.year,(count - 1),1);
			return formatDate(today)
		}
	}