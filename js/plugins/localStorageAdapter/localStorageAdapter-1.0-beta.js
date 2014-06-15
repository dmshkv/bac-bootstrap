//Roman Yudin
//https://github.com/hellfrom/Lapter.js
//05.12.2013
//Lapter.js
//adapter for localstorage
//    Lapter.namespace('my_storage');
//    if(!Lapter.is('test_model')){
//         console.log(Lapter.id);
//        Lapter.add('test_model')
//              .add('next_model')
//              .set('test_model',{data:[1,2,3,4,5]});
//         console.log(Lapter.get('test_model'));
//         Lapter.clear('test_model');
//    }else{
//       Lapter.remove('test_model');
//    }
//    console.log(Lapter.getId()); //check id of Lapter
//    Lapter.setId(3);  //to set uniq id for current session
//    Lapter.hardReset(); //reset all data and remove this lapter
//before Lapter start we may cleanup all localStorage: localStorage.clear() - it helps when we need create new Lapter for new Session

define([], function(){
    var Lapter={
        id:null,
        setId:function (id){
            var lapter=JSON.parse(localStorage.getItem(this._lapter));
            if(lapter){
                lapter.id=id;
                this.id=id;
                localStorage.setItem(this._lapter,JSON.stringify(lapter));
            }
        },
        getId:function (){
            var lapter=JSON.parse(localStorage.getItem(this._lapter));
            if(lapter){
                return lapter.id||"";
            }else{
                return false;
            }
        },
        _lapter:'lapter',
        //change default lapter collection - to use lapter in different application
        //use it to initialize uniq lapter_collection
        //if you want use lapter on different sites at the same time
        namespace:function (lapter_name){
            this._lapter=lapter_name;
            return this;
        },
        //adding of new model to Lapter
        add:function (model_name){
            var lapter=JSON.parse(localStorage.getItem(this._lapter)),
                model_name=this._lapter+"."+model_name;
            if(lapter){
                console.dir(lapter.collection);
                for(var i=0,length=lapter.collection.length; i<length; i++){
                    console.log(lapter.collection[i]==model_name);
                    if(lapter.collection[i]==model_name){
                        console.log('you can not add model: '+ model_name+'! Model with this name already exists.');
                        return this;
                    }
                }
                lapter.collection.push(model_name);

                localStorage.setItem(this._lapter,JSON.stringify(lapter));
            }else{

                localStorage.setItem(this._lapter, JSON.stringify({id:this.id, collection:[model_name]})); //i create array of model names
            }
            this._create(model_name);
            return this;
        },
        //remove one model from Lapter
        remove:function (model_name){
            //alert(this._lapter);
            var lapter=JSON.parse(localStorage.getItem(this._lapter)),
                model_name=this._lapter+"."+model_name;
            for(var i=0,length=lapter.collection.length; i<length; i++){
                if(lapter.collection[i]==model_name){
                    lapter.collection.splice(i,1);
                    this._destroy(model_name);
                }
            }
            localStorage.setItem(this._lapter, JSON.stringify(lapter));
            return this;
        },
        //remove All data from Lapter
        hardReset:function (){
            var lapter=JSON.parse(localStorage.getItem(this._lapter));
            try{
                for(var i=0,length=lapter.collection.length; i<length; i++){
                    this._destroy(lapter.collection[i]);
                }
                localStorage.removeItem(this._lapter);
            }catch(e){ console.log(e);}
            return this;
        },
        //check if model exists in localstorage
        is:function (model_name){
            var model_name=this._lapter+"."+model_name;
            if(localStorage.getItem(model_name)){
                return true;
            }else{
                return false;
            }
        },
        //private create single model
        _create:function (model_name){

            localStorage.setItem(model_name, "");
        //localStorage.setItem(model_name+'-'+temp_guid,{});
            return this;
        },
        //clear data from model
        clear:function (model_name){
            if(model_name){
                model_name=this._lapter+"."+model_name;
                //var model_hash=localStorage.getItem(model_name);
                try{
                    localStorage.setItem(model_name, "");
                }catch(e){ console.log(e);}
            }
            return this;
        },
        //private delete single model
        _destroy:function (model_name){

            //если есть
            if(model_name){
                //alert(model_name)
                try{
                    localStorage.removeItem(model_name);
                }catch(e){ console.log(e);}
            }
            return this;
        },
        //add data to model
        set:function (model_name, json_data){
            var model_name=this._lapter+"."+model_name;
            localStorage.setItem(model_name, JSON.stringify(json_data));
            return this;
        },
        //get data from model
        get:function (model_name){
            var model_name=this._lapter+"."+model_name;
            return	localStorage.getItem(model_name);
        }
    };
    return Lapter;
});