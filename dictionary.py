name={"tamilnadu":"chennai","kerala":"trivandrum","karnataka":"bangalore"}

print(name["tamilnadu"])
print(name.get("delhi"))
for i in name.keys():
    print(i)
for i in name.values():
    print(i)
for i in name.items():
    print(i)
new_cpname=name.copy() 
name.update({"keralla": "madurai"})

name.popitem()
print(name)
print(new_cpname)
name.pop("kerala")
name.setdefault("keralla","madurai")