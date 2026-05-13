low = 1
high = 50
gn = 0

print("Think of any positive number.")

# Phase 1: Find an upper bound
while True:
    print(f"My guess is: {high}")
    gn += 1

    response = input(
        "Is it higher, lower, or correct? "
    ).strip().lower()

    if response == "higher":
        low = high + 1
        high *= 2

    elif response == "lower":
        break

    elif response in ["correct", "yes"]:
        print(f"Yay! I guessed it in {gn} attempt(s).")
        exit()

    else:
        print("Invalid input.")

# Phase 2: Binary search
while low <= high:

    guess = (low + high) // 2

    print(f"My guess is: {guess}")
    gn += 1

    response = input(
        "Is it higher, lower, or correct? "
    ).strip().lower()

    if response == "higher":
        low = guess + 1

    elif response == "lower":
        high = guess - 1

    elif response in ["correct", "yes"]:
        print(f"Yay! I guessed it in {gn} attempt(s).")
        break

    else:
        print("Invalid input.")
        continue

    if low > high:
        print("Your answers are contradictory!")
        break