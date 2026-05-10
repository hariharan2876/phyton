age=int(input("enter your age"))

if age==100:
    print("you are a centenarian")
elif age>=13 and age<=18:
    print("you are a teenager")
elif age>18 and age<100:
    print("you are an adult")
else:
    print("you are a child")
