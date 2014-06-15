define([
    'jquery',
    'mockAjax'
], function($){
    $.mockjax({
        //url: '/ProductGUI/resource/ranks/*',
        url: '/LastMileGUI/ranks.json*',
        proxy: '/WaveGUI/vipcard/json/cardranks.txt',
        responseTime: 1
    });

    $.mockjax({
        url:'/LastMileGUI/checkCard.json*',
        responseText:{"Code":"ok", "ExpDate":"1217", "CodeErr":null,"DescErr":null, "isFriendCard":"Y"},
        response:function (){
            var rand = Math.ceil(Math.random()*100);
            if(rand>50&&rand<75){
                this.responseText = {"Code":"ok", "ExpDate":"1217", "CodeErr":401,"DescErr":"СМЕРТЕЛЬНАЯ ОШИБКА", "isFriendCard":"N"};
            }
        }
    });
    
    //ответ от компонента поиска клиента
    $.mockjax({
        url:'/LastMileGUI/findClient.json?cardReaderInput=n&sid*',
        //responseText:{}
        response:function (){

            var random=Math.random()*100;
           if(random >30&&random<50){
                this.responseText= {"50411699":
                            {
                                "birthday": "1986-04-27",
                                "docCountry": "УКРАИНА",
                                "docCountryActivity": "УКРАЇНА",
                                "docDateFinish": "",
                                "docDateStart": "2005-11-21",
                                "docGiven": "ПЕТРОПАВЛОВ.РОУМВД В ДНЕПР.ОБЛ.",
                                "docNumber": "420915",
                                "docSeries": "АН",
                                "docType": "ОБЩЕГРАЖДАНСКИЙ ПАСПОРТ",
                                "flJur": "N",
                                "flPhys": "Y",
                                "inn": "",
                                "name": "ГАЛИНА",
                                "patronymic": "АНАТОЛЬЕВНА",
                                "phone": "+380973650493",
                                "surname": "МАРЧУК"
                            }
                         };
                     }else if(random>50&&random<80){
                           this.responseText= {"50411698":
                           {
                               "birthday": "1986-04-27",
                               "docCountry": "УКРАИНА",
                               "docCountryActivity": "УКРАЇНА",
                               "docDateFinish": "",
                               "docDateStart": "2005-11-21",
                               "docGiven": "ПЕТРОПАВЛОВ.РОУМВД В ДНЕПР.ОБЛ.",
                               "docNumber": "420915",
                               "docSeries": "АН",
                               "docType": "ОБЩЕГРАЖДАНСКИЙ ПАСПОРТ",
                               "flJur": "N",
                               "flPhys": "Y",
                               "inn": "",
                               "name": "Абдурахман",
                               "patronymic": "АНАТОЛЬЕВНА",
                               "phone": "+380973650493",
                               "surname": "Гадя"
                           }
                           };
                     }else{
                        this.responseText={};
                     }
                 }//,
                       //proxy:'/WaveGUI/wardcard/json/client_search_response.txt'

    });
    
        
    
    //запросы приложения по существующим документам
    $.mockjax({
        url:'/LastMileGUI/app/findDoc.json*',
        proxy:'/WaveGUI/vipcard/json/mockDoc2.txt'
    });

    $.mockjax({
        url:'/LastMileGUI/app/createTicketID.json?*',

        responseText:{
            success:'ok'
        }
    });



    $.mockjax({
        url: '/ProductGUI/saveimg.json?*',
        //responseTime: 150,
        dataType: 'json',
        proxy:'/WaveGUI/vipcard/json/mockPhotoTicket.txt'
        //responseText : {"ticket":"62502742"}
    });
    
    $.mockjax({
        url: '/ProductGUI/validation.json',
        responseTime: 250,
        response: function(settings){
            console.log(settings);
            this.responseText = {"ref":"130726TS05409614IMWN"};
        }
    });
    $.mockjax({
        url: '/LastMileGUI/validationPhoto.json*',
        responseTime: 250,
        response: function(settings){
            console.log(settings);
            this.responseText = {"ref":"130726TS05409614IMWN"};
        }
    });

    $.mockjax({
        url: '/LastMileGUI/getValidationStatus.json?*',
        responseTime: 250,
        response: function(settings){
            console.log(settings);
            this.responseText = {"status":{"state":"valid"}};
            //this.responseText = {"status":{"state":"inprogress"}};
            //this.responseText = {"status":{"state":"unvalid"}};
        }
    });
    

        
    $.mockjax({
        url: '/ProductGUI/getCompaniesForSearch.json?*',
        dataType: 'json',
        proxy:'/WaveGUI/vipcard/json/payer_search.txt'
    });    
    
    $.mockjax({
        url: '/LastMileGUI/update/JUNICARD.json?*',
        dataType:'json',
        //responseText:{"error":{"text":"ошибка сервера"}}
        responseText:{"success":{"text":"ок"}}
    });

    //////////////////////////////////////
    $.mockjax({
        url:'/LastMileGUI/getAddressReference*',
        dataType:'json',
        proxy:'/WaveGUI/vipcard/json/addresses.txt'
    });
     $.mockjax({
        url:'/LastMileGUI/proxyXmlToJson.json*',
        dataType:'json',
        //responseText:{"errorMessage":{"@text":"текст ошибки","@code":"E06"}}
        proxy:'/WaveGUI/vipcard/json/schools.txt'
    });

    $.mockjax({
        url: '/LastMileGUI/service.json*',
        dataType:'json',
        //responseText:{error:{text:'ок'}}
        proxy:'/WaveGUI/vipcard/json/wallet_success.json'
        //proxy:'/WaveGUI/junicard/json/wallet_success_with_error.json'
    });

    $.mockjax({
        url: '/LastMileGUI/getPhones.json*',
        dataType:'json',
        responseText:{"contactList":[{"ctype":"MOB","cvalue":"+380937456002","cfin":"Y","light":"10"},     {"ctype":"MOB","cvalue":"+380923114718","cfin":"N","light":"10"}]}
    });
    $.mockjax({
        url: '/LastMileGUI/otp/password/generate.json*',
        dataType:'json',
        responseText:{
            state:'notOK'
        },
        response:function (){
            var rand=Math.random()*100;
            if(rand>50){
                this.responseText={
                    state:"OK"
                };
            }else{
                this.responseText={
                    state:"some trash info"
                };
            }
        }
    });
    $.mockjax({
        url: '/LastMileGUI/otp/password/check.json*',
        dataType:'json',
        responseText:{result:false},
        response:function (){
            var rand=Math.random()*100;
            if(rand>50){
                this.responseText={
                    result:true
                };
            }else{
                this.responseText={
                    result:false
                };
            }
        }
    });

    $.mockjax({
        url:'/ProductGUI/getSHPFoto/666.img',
        proxy:'/WaveGUI/vipcard/img/insurance.png'
    });
    $.mockjax({
        url:'/DesktopGUI/external/getProductRedirectUrl/UNIPACK.cors*',
        dataType:'json',
        responseText:{
            "result": {
                "status": "ok",
                "url": "https://test-start.privatbank.ua/ProductGUI/interaction/front.html?sys_id=RM&ref=140213TS06972429BZMQ&rnd=Thu Feb 13 10:20:16 FET 2014",
                "urlType": "WAVE"
            }
        }
    });
    $.mockjax({
        url:'/LastMileGUI/proxy.json?*',
        dataType:'json',

        responseText:{
            //error:{text:'ошибка'},
            //ERROR:"AUTHORIZERROR"

            "data":{
                "driverId":"somedevice",
                "devices":[
                    {
                        "id":"someId",
                        "descr":"Принтер",
                        "type":"PRINT"
                    }
                ],
                "errCode":null,
                "errText":null
            }

            //"data":{"statusCode":"TEMPLATE_NOT_FOUND","body":"Шаблон документа не существует","errCode":"242"}
        }
        /*
        response:function (){
            if(Math.random()*100>50){
                this.responseText={error:{text:'ошибка'}};
            }
        }*/
    });
});
