import time

rows=int(input("enter the number of rows:"))
columns=int(input("enter the number of columns:"))
symol=input("enter the symbol")

for i in range(rows):
    for j in range(columns):
        print(symol,end="")
    print()
    time.sleep(1)
     

    


      
for k in range(rows+1):
    print(symol*k)
    #time.sleep(1)

for k in range(rows+1,0,-1):
    print(symol*k)
    #time.sleep(1)

for i in range(1, rows+1):
    print(" " * (rows-i) + "*" * (2*i-1))
