# messages for users when they receive their score

def final_score_message(x):  # where x is the user's final score
    if x >= 0 and x <= 5:
        return print(
            "Oops! It seems like your green score is still hibernating. Time to wake up and plant some green deeds!")

    elif x > 5 and x <= 15:
        return print(
            "Your eco-journey is just sprouting – a little more sunshine and care, and you'll grow greener by the day!")

    elif x > 15 and x <= 30:
        return print(
            "You're like a budding eco-warrior, still learning to wield your recycling bin and energy-saving sword!")

    elif x > 30 and x <= 45:
        return print("Not bad! You're strolling through the green fields but watch out for eco-potholes on your path.")

    elif x > 45 and x <= 60:
        return print(
            "You're in the eco-game! Like a diligent bee, you're making the environment a bit sweeter. Keep buzzing!")

    elif x > 60 and x <= 75:
        return print(
            "Impressive! You're an eco-knight in shining armor, but there's still a dragon or two to slay on your green quest.")

    elif x > 75 and x <= 85:
        return print(
            "Eco-fantastic! You're almost a green guru, just a few more steps to reach the peak of Mount Sustainability.")

    elif x > 85 and x <= 90:
        return print("Wow, you're an eco-superhero! Just a cape shy of being Mother Nature's sidekick.")

    elif x > 90 and x <= 95:
        return print(
            "Eco-mazing! You're a walking, talking green encyclopedia. Just a few more pages to add to your eco-legacy.")

    elif x > 95 and x <= 100:
        return print("Congratulations, Eco-Master! You're not just walking the green walk; you're leading the parade!")