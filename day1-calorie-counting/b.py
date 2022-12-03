with open('input.txt', 'r') as f:
    data = f.read().split("\n")

total = 0
result = 0

for value in data:
    if value:
        total += int(value)
        result = max(result, total)
    else:
        total = 0

print(result)