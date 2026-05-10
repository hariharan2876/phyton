tup=(1,)+(1,)
print(tup+tup)

for i in range(-1,1):
    print("python",end="")

print(True+1)

str=""" """
print(len(str))

print(1/1)

print(1+1.0)


        


a=(('a',10),('b',20),('c',30))
print(dict(a))

mlist=[0 for i in range(1,3)]
print(mlist)
print([0 for i in range(1,3)])

print(sorted((3,1,2 )))


try:
    b=1/0
except ZeroDivisionError:
    print("Error: Division by zero")
finally:
    print("Execution completed")
