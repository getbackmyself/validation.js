
	
	//Тут будет храниться отвалидированные данные которые могут быть отправленны на сервер
		var query={}; 
	//		
	
	function validation(element, alert, decor){
		
		var obj=this;
		
		
		//определяем значения по умолчанию
			this.decor={error:true, warning:true, info:true, success:true, status:true};
			this.alert={error:true, warning:true, info:true, success:true, status:true};
		//
		
		
		
		//перезаписываем значени по умолчанию
			for (var localKey in this.decor) {
				for(var globalKey in decor){
					if(decor[globalKey]!=undefined){obj.decor[globalKey]=decor[globalKey];}
				};
			};
			
			for (var localKey in this.alert) {
				for(var globalKey in alert){
					if(alert[globalKey]!=undefined){obj.alert[globalKey]=alert[globalKey];}
				};
			};			
		//
		
		
		//стили для контейнера с сообщением успех
			this.success="box-shadow: 0px 0px 6px rgb(0, 97, 2); border: 1px solid rgb(2, 123, 4)";
		//	
		
		//стили для контейнера с сообщением ошибка
			this.error="box-shadow: 0px 0px 6px #a94442; border: 1px solid #a94442";
		//			
		
				
		this.text=function(){
			
			//шаблоны
				this.userName=/^[а-яА-ЯёЁa-zA-Z]{2,15}$/, userNameMessage="Ошибка: Имя пользователя указанно не верно", userNameReplace=/[\[\]\{\}\*\&\$\#\@\\\<\>\/\_]/g;
				this.email=/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/, emailMessage="Ошибка: Неправильный ввод email";
				this.phone=/^[0-9]{11}$/, phoneMessage="Ошибка: Неправильный формат телефона";
				this.password=/^[a-zA-Z0-9]{3,}$/, passwordMessage="Ошибка: Неправильный ввод пароля";
				this.varchar=/^[а-яА-ЯёЁ\-\?!:;"'.,()+\sa-zA-Z0-9]{0,255}$/, varcharMessage="Спецсимволы запрещены", varcharReplace=/[\[\]\{\}\*\&\$\#\@\\\<\>\/\_]/g;
				this.price=/^[0-9]{0,10}[.]{0,1}[0-9]?$/, priceMessage="Используйте точку для ввода дробного остатка - только цифры", priceReplace=/[\[\]\{\}\*\&\$\#\@\\\<\>\/\-\(\)\+\=\^\%\!\?\"\;\:\'\|\,\~\`\±\§\_а-яА-ЯёЁ\sa-zA-Z]/g;
			//	
			
			var pattern=this[element.dataset.validation];//динамическая переменная - исходя из названия validation в input-те, в данную переменую будет помещен паттерт из рядя констрант если паттерна нет то значение будет undefined
			var description=element.placeholder;
			
			if(typeof(element.dataset.validation) != "undefined"){//если указанно необходимать валидации
				if(typeof(pattern) == "undefined"){//если паттерн для валидации не существует в шаблонах
					(obj.alert.status && obj.alert.warning)?new message("warning", 5000, element.dataset.validation+" - Такой паттер не предусмотрен в типе"+element.type):"";
					delete query[element.name];//удаляем если что-то было
					return false;
				}else if(typeof(pattern) != "undefined" && element.value.match(pattern)!=null){//если паттерн существует и валидация по нему успешно прошла
					(obj.decor.status && obj.decor.success)?element.style.cssText=obj.success:element.setAttribute("style", "");
					query[element.name]=element.value;
					return element.value==""?" ":element.value;//если пользователь оставил поле пустым, и это разрешено в патерне, поясняем языку js - что это true
				}else if(typeof(pattern) != "undefined" && !element.value.match(pattern)!=null && !element.value){//если паттер существует и валидация по нему не прошла из-за пустого поля
					(obj.decor.status && obj.decor.error)?element.style.cssText=obj.error:element.setAttribute("style", "");
					alert?new message("error", 3000, "Поле "+description+" должно быть заполненно"):"";
				}
				else{//если валидация не прошла
					(obj.decor.status && obj.decor.error)?element.style.cssText=obj.error:element.setAttribute("style", "");
					(obj.alert.status && obj.alert.error)?new message("error", 3000, eval(element.dataset.validation+"Message")):"";
					delete query[element.name];//удаляем если что-то было
					
					//console.log(typeof(eval(element.dataset.validation+"Replace"))!= "undefined");
					//проверим если патерт замены если есть проводим замену по паттерну [pattern]Replace иначе удаляем всю строку без замены
					//(typeof(eval(element.dataset.validation+"Replace")) != "undefined")?element.value=element.value.replace(eval(element.dataset.validation+"Replace"), ""):element.value="";
					element.value=element.value.replace(eval(element.dataset.validation+"Replace"), "")
					
					return false;
				}					
			}else{//если необходимость в валидации не указанна пропускаем поле без валидации
				if(!element.value){//если поле пустое удаляем его с запроса
					delete query[element.name];
					(obj.decor.status && obj.decor.success)?element.style.cssText=obj.success:element.setAttribute("style", "");
					return true;
				}else{//иначе записываем поле в запрос
					query[element.name]=element.value;
					(obj.decor.status && obj.decor.success)?element.style.cssText=obj.success:element.setAttribute("style", "");
					return element.value;//возвращаем не true а отвалидированное значение
				};
			};
		};
		



		this.number=function(){
			
			//шаблоны
				this.phone=/^[0-9]{11}$/, phoneMessage="Ошибка: Неправильный формат телефона";
				this.price=/^[0-9]{0,10}[.]{0,1}[0-9]?$/, priceMessage="Используйте точку для ввода дробного остатка - только цифры", priceReplace=/[\[\]\{\}\*\&\$\#\@\\\<\>\/\-\(\)\+\=\^\%\!\?\"\;\:\'\|\,\~\`\±\§\_а-яА-ЯёЁ\sa-zA-Z]/g;

			//	
			
			var pattern=this[element.dataset.validation];//динамическая переменная - исходя из названия validation в input-те, в данную переменую будет помещен паттерт из рядя констрант если паттерна нет то значение будет undefined

			var description=element.placeholder;
			
			if(typeof(element.dataset.validation) != "undefined"){//если указанно необходимать валидации
				if(typeof(pattern) == "undefined"){//если паттерн для валидации не существует в шаблонах
					(obj.alert.status && obj.alert.warning)?new message("warning", 5000, element.dataset.validation+" - Такой паттер не предусмотрен в типе"+element.type):"";
					delete query[element.name];//удаляем если что-то было
					return false;
				}else if(typeof(pattern) != "undefined" && element.value.match(pattern)!=null){//если паттерн существует и валидация по нему успешно прошла
					(obj.decor.status && obj.decor.success)?element.style.cssText=obj.success:element.setAttribute("style", "");
					query[element.name]=element.value;
					return element.value==""?'0':element.value;//если пользователь оставил поле пустым, и это разрешено в патерне, поясняем языку js - что это true
				}else if(typeof(pattern) != "undefined" && !element.value.match(pattern)!=null && !element.value){//если паттер существует и валидация по нему не прошла из-за пустого поля
					(obj.decor.status && obj.decor.error)?element.style.cssText=obj.error:element.setAttribute("style", "");
					alert?new message("error", 3000, "Поле "+description+" должно быть заполненно"):"";
				}
				else{//если валидация не прошла
					(obj.decor.status && obj.decor.error)?element.style.cssText=obj.error:element.setAttribute("style", "");
					(obj.alert.status && obj.alert.error)?new message("error", 3000, eval(element.dataset.validation+"Message")):"";
					delete query[element.name];//удаляем если что-то было
					
					//console.log(typeof(eval(element.dataset.validation+"Replace"))!= "undefined");
					//проверим если патерт замены если есть проводим замену по паттерну [pattern]Replace иначе удаляем всю строку без замены
					//(typeof(eval(element.dataset.validation+"Replace")) != "undefined")?element.value=element.value.replace(eval(element.dataset.validation+"Replace"), ""):element.value="";
					element.value=element.value.replace(eval(element.dataset.validation+"Replace"), "")
					
					return false;
				}					
			}else{//если необходимость в валидации не указанна пропускаем поле без валидации
				if(!element.value){//если поле пустое удаляем его с запроса
					delete query[element.name];
					(obj.decor.status && obj.decor.success)?element.style.cssText=obj.success:element.setAttribute("style", "");
					return true;
				}else{//иначе записываем поле в запрос
					query[element.name]=element.value;
					(obj.decor.status && obj.decor.success)?element.style.cssText=obj.success:element.setAttribute("style", "");
					return element.value;//возвращаем не true а отвалидированное значение
				};
			};							
		};


		this.SELECT=function(){
			
			var description=element.options[0].text;//описание select поля
			if(typeof(element.dataset.validation) != "undefined"){//если необходимость в валидации указана
				if(element.value==""){//если выставленны правила выбора но выбор не сделан, выводим сообщение об ошибки
					(obj.decor.status && obj.decor.error)?element.style.cssText=obj.error:element.setAttribute("style", "");
					(obj.alert.status && obj.alert.error)?new message("error", 3000, "Выберите вариант из поля - "+description):"";
					delete query[element.name];//удаляем если что-то было
					return false;
				}else{//иначе добавляем результат выбора в запрос
					(obj.decor.status && obj.decor.success)?element.style.cssText=obj.success:element.setAttribute("style", "");
					query[element.name]=element.value;
					return element.value;//возвращаем не true а отвалидированное значение;
				};
			}else{//иначе пропускаем поле без валидации
				(obj.decor.status && obj.decor.success)?element.style.cssText=obj.success:element.setAttribute("style", "");
				query[element.name]=element.value;
				return element.value;//возвращаем не true а отвалидированное значение;
			};				
		};
		


		this.TEXTAREA=function(){
			
			//шаблоны
				this.userName=/^[а-яА-ЯёЁa-zA-Z]{2,15}$/, userNameMessage="Ошибка: Имя пользователя указанно не верно";
				this.email=/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/, emailMessage="Ошибка: Неправильный ввод email";
				this.phone=/^[0-9]{11}$/, phoneMessage="Ошибка: Неправильный формат телефона";
				this.password=/^[a-zA-Z0-9]{3,}$/, passwordMessage="Ошибка: Неправильный ввод пароля";
				this.varchar=/^[а-яА-ЯёЁ\-\?!:;"'.,\sa-zA-Z0-9]+$/, varcharMessage="Спецсимволы запрещены - поле очищенно", varcharReplace=/[\[\]\{\}\*\&\$\#\@\\\<\>\/]/g;
				this.price=/^[0-9.]{0,10}$/, priceMessage="Используйте точку для ввода дробного остатка - только цифры";
			//	
			
			var description=element.placeholder;//описание поля
			var pattern=this[element.dataset.validation];//динамическая переменная - исходя из названия validation в input-те, в данную переменую будет помещен паттерт из рядя констрант если паттерна нет то значение будет undefined
			
			//console.log(element.value.match(varcharReplace)!=null);
			//console.log(element.value.replace(obj.varcharReplace, " "))
			
			if(element.dataset.validation){//если указанно необходимать валидации
				if(typeof(pattern) == "undefined"){//если паттерн для валидации не существует в шаблонах
					(obj.alert.status && obj.alert.warning)?new message("warning", 5000, element.dataset.validation+" - Такой паттер не предусмотрен в типе"+element.type):"";
					delete query[element.name];//удаляем если что-то было
					return false;
				}else if(typeof(pattern) != "undefined" && element.value.match(pattern)!=null){//если паттерн существует и валидация по нему успешно прошла
					(obj.decor.status && obj.decor.success)?element.style.cssText=obj.success:element.setAttribute("style", "");
					query[element.name]=element.value;
					return element.value==""?" ":element.value;//если пользователь оставил поле пустым, и это разрешено в патерне, поясняем языку js - что это true
				}else if(typeof(pattern) != "undefined" && !element.value.match(pattern)!=null && !element.value){//если паттер существует и валидация по нему не прошла из-за пустого поля
					(obj.decor.status && obj.decor.error)?element.style.cssText=obj.error:element.setAttribute("style", "");
					(obj.alert.status && obj.alert.error)?new message("error", 3000, "Поле "+description+" должно быть заполненно"):"";
				}
				else{//если валидация не прошла
					(obj.decor.status && obj.decor.error)?element.style.cssText=obj.error:element.setAttribute("style", "");
					(obj.alert.status && obj.alert.error)?new message("error", 3000, eval(element.dataset.validation+"Message")):"";
					delete query[element.name];//удаляем если что-то было
					//str.replace(/тест/g,"прошел") // = "прошел еще прошел"
					element.value=element.value.replace(eval(element.dataset.validation+"Replace"), "");//заменяем элементы прописанные в [pattern]Replace на пустое место и записываем в содержания ячейки
					return false;
				}					
			}else{//если необходимость в валидации не указанна пропускаем поле без валидации
				if(!element.value){//если поле пустое удаляем его с запроса
					delete query[element.name];
					(obj.decor.status && obj.decor.success)?element.style.cssText=obj.success:element.setAttribute("style", "");
					return true;//так как поле пустое возвращаем просто true
				}else{//иначе записываем поле в запрос
					query[element.name]=element.value;
					(obj.decor.status && obj.decor.success)?element.style.cssText=obj.success:element.setAttribute("style", "");
					return element.value;//возвращаем не true а отвалидированное значение
				};
			};			
		};


		
		//надо сделать массивы. в одном статусы checked всех элементов. во втором содержание dataset.validation в третьем содержания value всех элементов
		 //и потом делать перебор массивов с помошью цикла записывая в инкапсулированные переменные состояние элементов и выборку в случаи необходимости
		this.radio=function(){
			
			var description="Выберите один из вариантов";//описание
			var status=false;//валидировать или нет, если нет то false, если да то true
			var checked=false;//текущее состояние эламентов, если хотябы 1 элемент выбран то будет true и валидация прошла успешно
			var value;//содержание отвалидированных данных
			
			var elementArr=document.getElementsByName(element.name);//получаем все элементы радио в виде массива
			
			for(var i=0;i<elementArr.length;i++){
				
				description+=" : "+elementArr[i].value;	//формируем описание в случаи ошибки			
				
				//определяем надобность валидации
				if(typeof(elementArr[i].dataset.validation) != "undefined"){//если хотябы на одном элементе  паттерн существует записываем в статус валидации true
					status=true;
				};
				
				//проверяем текущий статус
				if(elementArr[i].checked==true){//если хотябы один элемент выбран то валидация прошла успешно
					checked=true;
				};					
			};			
			
			
			
			if(status && checked){//если надо валидировать и валидация соблюденна
				
				for(var i=0;i<elementArr.length;i++){
	
					if(elementArr[i].checked==true){//записываем выбранный пункт в запрос и добавляем стили
						(obj.decor.status && obj.decor.success)?elementArr[i].parentNode.style.cssText=obj.success:element.setAttribute("style", "");
						query[element.name]=elementArr[i].value;
						value=elementArr[i].value;
					}else{
						(obj.decor.status && obj.decor.success)?elementArr[i].parentNode.style.cssText=obj.success:"";
					}
				};
				
				return value;//возвращаем не true а отвалидированное значение;			
			}else if(!status){//если валидировать не надо	
				
				for(var i=0;i<elementArr.length;i++){
	
					if(elementArr[i].checked==true){//записываем выбранный пункт в запрос и добавляем стили
						(obj.decor.status && obj.decor.success)?elementArr[i].parentNode.style.cssText=obj.success:element.setAttribute("style", "");
						query[element.name]=elementArr[i].value;
						value=elementArr[i].value;
					}else{
						elementArr[i].parentNode.style.cssText=obj.success;
					}
				};
							
				return value;//возвращаем не true а отвалидированное значение;
			}else{//иначе выводим сообщение ошибки и о необходимости выбора
				
				for(var i=0;i<elementArr.length;i++){	
					(obj.decor.status && obj.decor.error)?elementArr[i].parentNode.style.cssText=obj.error:element.setAttribute("style", "");
				};
				
				(obj.alert.status && obj.alert.error)?new message("error", 3000, description):"";
				delete query[element.name];//удаляем если что-то было
				return false;			
			};	
		};		
		

		this.checkbox=function(){
			
			var description=element.value;//описание select поля
			
			if(typeof(element.dataset.validation) != "undefined"){//если необходимость в валидации указана
				if(element.checked==false){//если выставленны правила выбора но выбор не сделан, выводим сообщение об ошибки
					(obj.decor.status && obj.decor.error)?element.nextSibling.style.cssText=obj.error:element.setAttribute("style", "");
					(obj.alert.status && obj.alert.error)?new message("error", 3000, "Выберите вариант - "+description):"";
					delete query[element.name];//удаляем если что-то было
					return false;
				}else{//иначе добавляем результат выбора в запрос
					(obj.decor.status && obj.decor.success)?element.nextSibling.style.cssText=obj.success:element.setAttribute("style", "");
					query[element.name]=element.value;
					return element.value;//возвращаем не true а отвалидированное значение;
				};
			}else{//иначе пропускаем поле без валидации
				if(element.checked==true){//если поле выбранно
					(obj.decor.status && obj.decor.success)?element.nextSibling.style.cssText=obj.success:element.setAttribute("style", "");
					query[element.name]=element.value;
					//console.log(element.name+"Поле выбранно"+element.value);
					return element.value;//возвращаем не true а отвалидированное значение;					
				}else{//если поле не выбрано
					(obj.decor.status && obj.decor.success)?element.nextSibling.style.cssText=obj.success:element.setAttribute("style", "");
					query[element.name]="0";//по умолчанию ставим в случаи не выбранного поля 0
					//console.log(element.name+"Поле не  выбранно");
					return "0";//по умолчанию ставим в случаи не выбранного поля 0
				}
			};				
		};


		
		this.button=function(){
			
			//if(typeof(element.name) == "undefined" && element.value.match(/$[а-яА-ЯёЁ\-_a-zA-Z0-9]/)!=null){
				query[element.name]=element.value;
			//};
			//console.log(query);
			return true;
		};
		
		this.submit=function(){
			return true;
		};
		
			
		//console.log(element.type);
		return (element.tagName=="SELECT" || element.tagName=="TEXTAREA")?obj[element.tagName]():obj[element.type]();
	};		
		
		

