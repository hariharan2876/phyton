food=["dosa","idly","vada"]

print(food)
food.append("poori")
food.append("poori")
print(food.count("poori"))
food.remove("poori")
food.insert(1,"chapathi")
print (food)
food.sort()
print (food)
food.extend(["biriyani","fried rice"])
print(food)
food.pop()
print(food.index("vada"))
del list
#food.reverse()

for i in food:
    print(i)
