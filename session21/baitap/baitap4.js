let a=prompt("Moi ban nhap so a cho pt ax^2 + bx + c = 0 : ");
let b=prompt("Moi ban nhap so b cho pt ax^2 + bx + c = 0 : ");
let c=prompt("Moi ban nhap so c cho pt ax^2 + bx + c = 0 : ");
let denta=Math.pow(b,2)-4*a*c;
let x1=(-b+Math.sqrt(denta))/(2*a);
let x2=(-b-Math.sqrt(denta))/(2*a); 
console.log("Nghiem thu nhat cua pt la: "+x1);
console.log("Nghiem thu hai cua pt la: "+x2);


