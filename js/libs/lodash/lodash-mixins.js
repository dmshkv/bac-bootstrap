_.mixin({
    //алфавитная нумерация
    alphabetMark:function (num){
        var alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        return alphabet[num];
    },
    //сконяем слова 1 человек() 2 человек(а) 9 человек()
    wordForm:function (num,arr){
        var re=/[0-9]\b/;
        num=num.toString();
        if(num.match(re)){
            var lastTen=num.substr(-2); //отрезали 2 цифры с конца
            //узнаем предпоследнюю цифру
            var preLast=lastTen.charAt(lastTen.length-2);
            var last=lastTen.charAt(lastTen.length-1);
            if(preLast=='1'){
                return arr[2];
            }else{
                if(last==0||(last>=5&&last<=9))
                    return arr[2];
                if(last>1&&last<=4){
                    return arr[1];
                }
                if(last==1){
                    return arr[0];
                }
            }
        }
    },
	getCurrentDate:function (sep){
	  var divider=sep||".",
		  date=new Date(),
	  //date=new Date(2012,2,1),
		  day,month,year;
		  
	  day=(date.getDate()<10)?("0"+date.getDate()):(date.getDate());
	  month=((date.getMonth()+1)<10)?("0"+(date.getMonth()+1)):(date.getMonth()+1);
	  year=date.getFullYear();
	  return day+divider+month+divider+year;
	  //console.log(getCurrentDate()); //"14.10.2013"
	},
        getCurrentTime:function (sep){
            var divider=sep||":",
		  date=new Date(),
		  hours,minutes,seconds;
                hours=date.getHours();
                minutes=date.getMinutes();
                seconds=date.getSeconds();
                if(minutes.toString().length==1){
                     minutes="0"+minutes;
                }
                if(seconds.toString().length==1){
                     seconds="0"+seconds;
                }
            return hours+divider+minutes+divider+seconds;
        },
        maskCard:function (card){
            card=String(card);
            return card.slice(0,4)+" **** **** "+card.slice(-4);
        },
        formatDate :function (date, fmt) {
            //alert(formatDate(now, "{FullYear}-{Month:2}-{Date:2}"));
            //  2008-09-02
            //alert(formatDate(now, "{Hours:2}:{Minutes:2}:{Seconds:2}.{Milliseconds:3}"));
            //  15:47:32.156
            return fmt.replace(
                /\{([^}:]+)(?::(\d+))?\}/g,
                function (s, comp, pad) {
                    var fn = date["get" + comp];

                    if (fn) {
                        var v = (fn.call(date) +
                            (/Month$/.test(comp) ? 1 : 0)).toString();

                        return pad && (pad = pad - v.length)
                            ? new Array(pad + 1).join("0") + v
                            : v;
                    } else {
                        return s;
                    }
                });
        },
    trim:function (str){
        return str.replace( /^\s+|\s+$/g, '' );
    },
    getCurrencyText:function (code){
        var currencyCodes={124:"CAD",203:"CZK",376:"ILS",392:"JPY",578:"NOK",756:"CHF",810:"RUR",826:"GBP",840:"USD",978:"EUR",985:"PLZ",980:"UAH"};
        return currencyCodes[code]||"";
    },
    getExpireDate:function (text){
        if(text){
            text=text.toString();
            return text.substr(0,2)+"/"+text.substr(2);
        }else{
            return "";
        }
    }
});