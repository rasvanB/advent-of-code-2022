with open('input.txt', 'r') as f:
    data = f.read().split("\n")

total = 0
result = 0
top = []

for value in data:
    if value:
        total += int(value)
    else:
        top.append(total)
        total = 0

top.sort(reverse=True)
print(sum(top[:3]))