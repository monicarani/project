
var msgs=document.getElementById("messagebox");
var usermsg=document.getElementById("tomessage");
var botmsg=document.getElementById("fromessage");
var inmsg=document.getElementById("typemessage");

morning={1:{no:1,name:"Aloo Paratha",cost:30,quantity:0},2:{no:2,name:"Semiya Upma",cost:35,quantity:0},3:{no:3,name:"Masala Dosa",cost:25,quantity:0},4:{no:4,name:"Poori",cost:20,quantity:0},5:{no:5,name:"Idli(Sambar)",cost:20,quantity:0},6:{no:6,name:"Vada",cost:15,quantity:0},7:{no:7,name:"Ragi Rava Upma",cost:30,quantity:0},8:{no:8,name:"Rava Utappam",cost:35,quantity:0},9:{no:9,name:"Bread Omelette",cost:30,quantity:0},10:{no:10,name:"Green Salad",cost:30,quantity:0},11:{no:11,name:"Tea",cost:8,quantity:0},12:{no:12,name:"Coffee",cost:7,quantity:0}};
afternoon={1:{no:1,name:"Veg Thali",cost:50,quantity:0},2:{no:2,name:"Veg Biryani",cost:45,quantity:0},3:{no:3,name:"Lemon Rice",cost:30,quantity:0},4:{no:4,name:"Tomato Rice",cost:30,quantity:0},5:{no:5,name:"Mushroom Biryani",cost:40,quantity:0},6:{no:6,name:"Naan-Butter Paneer Masala",cost:40,quantity:0},7:{no:7,name:"Non-Veg Thali",cost:60,quantity:0},8:{no:8,name:"One-pot Chicken Biryani",cost:65,quantity:0},9:{no:9,name:"Prawn Biryani",cost:70,quantity:0},10:{no:10,name:"Curd Rice",cost:30,quantity:0},11:{no:11,name:"Thumpsup",cost:15,quantity:0},12:{no:12,name:"Sprite",cost:15,quantity:0}};
evening={1:{no:1,name:"Pav Bhaji",cost:30,quantity:0},2:{no:2,name:"Paneer Tikka",cost:30,quantity:0},3:{no:3,name:"Spring Rolls",cost:20,quantity:0},4:{no:4,name:"Gobi Manchurian",cost:30,quantity:0},5:{no:5,name:"Veg grilled Sandwich",cost:25,quantity:0},6:{no:6,name:"Chilli Babycorn",cost:25,quantity:0},7:{no:7,name:"Paneer naan Pizza",cost:35,quantity:0},8:{no:8,name:"Egg Pakora",cost:35,quantity:0},9:{no:9,name:"Fire Chicken",cost:40,quantity:0},10:{no:10,name:"Fish 65",cost:50,quantity:0},11:{no:11,name:"Tea",cost:8,quantity:0},12:{no:12,name:"Coffee",cost:7,quantity:0}};
night={1:{no:1,name:"Tomato Soup",cost:30,quantity:0},2:{no:2,name:"Veg corn Soup",cost:30,quantity:0},3:{no:3,name:"Soya Salad",cost:35,quantity:0},4:{no:4,name:"Pulka-mixed vegetable curry",cost:40,quantity:0},5:{no:5,name:"Veg Thali",cost:50,quantity:0},6:{no:6,name:"Vegetable Pulao",cost:45,quantity:0},7:{no:7,name:"Chicken Fried Rice",cost:55,quantity:0},8:{no:8,name:"Non-veg Thali",cost:60,quantity:0},9:{no:9,name:"One-pot Mushroom Biryani",cost:50,quantity:0},10:{no:10,name:"Curd Rice",cost:30,quantity:0},11:{no:11,name:"Thumpsup",cost:15,quantity:0},12:{no:12,name:"Sprite",cost:15,quantity:0}};

msgid=0;
var flag=true;
step=1;
var time=new Date().getHours();

function work()
{
    var name=inmsg.value;
    next(name);
    inmsg.value="";
}

function next(msg)
{
    msgs.innerHTML+=usermsg.outerHTML;
    msgid+=1;
    msgs.lastChild.id=msgid;
    msgs.lastChild.childNodes[3].textContent=msg;
    msgs.innerHTML+=botmsg.outerHTML;
    msgid+=1;
    msgs.lastChild.id=msgid;
    msgs.lastChild.childNodes[3].textContent=process(msg);
}

function process(input)
{
    if(flag)
    {
        if(input!="")
        {
            flag=false;
            if(time>=23 || time <6)
            {
                inmsg.style.display="none";
                return "Sorry! "+input.toUpperCase()+". The service is not available...Visit again...";
            }
            else if(time>=6 && time<12){
                greet="Morning";
                recipe=morning;
                }
            else if(time>=12 && time<16){
                greet="Afternoon";
                recipe=afternoon;
                }
            else if(time>=16 && time<=18){
                greet="Evening";
                recipe=evening;
                }
            else if(time>18 && time<=22){
                greet="Evening";
                recipe=night;
                }
            var list = document.createElement('ul');
            var fragment = document.createDocumentFragment();
            for(i=1;i<13;i++) {
                var li = document.createElement('li');
                li.textContent = "("+recipe[i].no +") "+recipe[i].name+" ----- Rs.)"+recipe[i].cost+" ";
                fragment.appendChild(li);
            }
            list.appendChild(fragment);
            document.getElementById(msgid).appendChild(list);
            var para=document.createElement("P");
            para.innerText="Each item is given ID ---> '(1).Aloo Paratha---- Rs.30' <-- Here '1' is ID. Please enter the recipe you want in form of 'ID of recipe-Quantity' like ---> 1-2 <--. It means '2 plates of Aloo Paratha.'";
            document.getElementById(msgid).appendChild(para);
            var para=document.createElement("P");
            para.innerText="Enter all the order at once separating each one with comma ',' --->Example: 1-2,2-3,4-1 <-- Don't add any other punctuation or text.Mention the ID only once. Click 'send' after completing." 
            document.getElementById(msgid).appendChild(para);
            step++;
            return ("Good "+greet+" "+input.toUpperCase()+". Nice to see you here. This is the menu we offer at this time...");
        }
        else
        {
            return "Mention your name please...";
        }
    }
    else
    {
        if(step==2)
        {
            calculate(input);
            step++;
            return "This is the order you gave. If anything is to be changed please refresh and start again...";
        }

        if(step==3)
        {
            if(input.toLowerCase()=="done")
            {
                payment();
                step++;
                return "PAY THROUGH THE BAR AT THE TOP HAVING 'CLICK ON ME TO PAY' ";
            }
            else
            {
                return "If anything went wrong please refresh and start again or else type 'done'";
            }
        }
        if(step==4)
        {
            if(input.toLowerCase()=="paid")
            {
                step++;
                feedback();  
                return "Your payment is successful.";
            }
            else
            {
                return "Type 'paid' after payment.";
            }
        }
        if(step==5)
        {
            if(parseInt(input)<1 || parseInt(input)>5)
                return "Please type between 1 to 5 ";
            else 
            {
                review(parseInt(input));
                return "Thanks for the feedback."
            }
        }   
    }
}

function calculate(input)
{
    sum=0;
    arr=input.split(",");
    arr.forEach(element => {
        var [num,quan]=element.split("-").map(x=>+x);
        recipe[num].quantity=quan;
    });
    var list = document.createElement('ul');
    var fragment = document.createDocumentFragment();
    for(i=1;i<13;i++)
    {
        if(recipe[i].quantity>0)
        {
            var li = document.createElement('li');
            li.textContent = "("+recipe[i].no +") "+recipe[i].name+" --- "+recipe[i].quantity+"   * Rs.)"+recipe[i].cost+" ===>"+ "  Rs.) "+(recipe[i].quantity*recipe[i].cost);
            sum+=recipe[i].quantity*recipe[i].cost;
            fragment.appendChild(li);
        }
    }
    list.appendChild(fragment);
    document.getElementById(msgid).appendChild(list);
    var para=document.createElement("P");
    para.innerText="Total amount ==> Rs.)"+sum;
    document.getElementById(msgid).appendChild(para);
    var para=document.createElement("P");
    para.innerText="After checking please type 'DONE' for further process." ;
    document.getElementById(msgid).appendChild(para);  
}

function payment()
{
    var para=document.createElement("P");
    para.innerText="Type 'PAID' after the payment..." ;
    document.getElementById(msgid).appendChild(para);  
    document.getElementById("payment").style.display="block";
}

function feedback()
{
    document.getElementById("payment").style.display="none";
    var para=document.createElement("P");
    para.innerText="Please provide feedback about me.Give your rating from 1 - 5 :" ;
    document.getElementById(msgid).appendChild(para); 
}

function review(input)
{
    var para=document.createElement("P");
    if(input >=1 && input <=3)
    {
        para.innerText="I wish next time you would feel more comfortable.";
    }
    else
    {
        para.innerText="Seems you have enjoyed using me.";
    }
    document.getElementById(msgid).appendChild(para); 
    var para=document.createElement("P");
    para.innerText="Hope you will have a great time here....Visit again!!!" ;
    document.getElementById(msgid).appendChild(para); 
    document.getElementById("typemessage").style.display="none";
    document.getElementById("button").style.display="none";
}