dinner={"dosa","idly","vada","chapathi"}
icecream={"chocolate","vanilla","strawberry","chapathi"}
dinner.add("poori")
dinner.add("poori")
dinner.remove("poori")

dinner.update(icecream)
dinner_all=dinner.union(icecream)
print(dinner_all)
print(dinner.intersection(icecream))
print(dinner.difference(icecream))
dinner.pop()
dinner.discard("vada")
print(dinner)




print (type(dinner))