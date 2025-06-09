export interface DemoOption {
  id: string;
  text: string; // Text displayed to the user for this option
  aiResponse: string; // The AI's pre-written response if this option is chosen
  nextPrompt?: string; // The next question/prompt from the AI
  nextOptions?: DemoOption[]; // Array of next choices for the user
  isTerminal?: boolean; // True if this is the end of a demo branch
}

export interface DemoScenario {
  id: string;
  initialPrompt: string;
  initialOptions: DemoOption[];
}

export const demoScenarios: DemoScenario[] = [
  // Scenario 1: Feeling Overwhelmed
  {
    id: "scenario1_overwhelm",
    initialPrompt: "How are you feeling today, or what's on your mind?",
    initialOptions: [
      {
        id: "s1_optA_work",
        text: "I'm feeling really overwhelmed with work.",
        aiResponse: "It sounds like work is feeling like a heavy weight on your shoulders right now, and that sense of overwhelm can be really draining. When that feeling is present...",
        nextPrompt: "What aspects of work feel most overwhelming at the moment?",
        nextOptions: [
          {
            id: "s1_optA1_deadlines",
            text: "It's the deadlines, they're all piling up.",
            aiResponse: "Ah, yes, when deadlines stack up it can definitely feel like you're under a lot of pressure. It's understandable that would contribute to feeling overwhelmed. What goes through your mind when you think about all those deadlines?",
            nextPrompt: "What are some of those thoughts?",
            nextOptions: [
              {
                id: "s1_optA1_1_not_good_enough",
                text: "I'm worried I'm not good enough to meet them.",
                aiResponse: "That thought, 'I'm not good enough,' can be incredibly painful and add to the pressure you're feeling. It's common for self-doubt to creep in when facing tough challenges. What does that thought feel like in your body?",
                isTerminal: false,
                nextPrompt: "What physical sensations do you notice?",
                nextOptions: [
                  {
                    id: "s1_optA1_1_1_tight_chest",
                    text: "A tightness in my chest.",
                    aiResponse: "A tightness in the chest is a very common physical manifestation of anxiety and stress. It sounds like your body is really holding onto this feeling of not being good enough. What do you usually do when you feel that tightness?",
                    isTerminal: true,
                  },
                  {
                    id: "s1_optA1_1_2_stomach_churn",
                    text: "My stomach churns.",
                    aiResponse: "A churning stomach can be a very uncomfortable physical symptom of stress or worry. It seems your body is reacting quite strongly to these thoughts. What is the churning telling you?",
                    isTerminal: true,
                  },
                ],
              },
              {
                id: "s1_optA1_2_too_much_to_do",
                text: "There's just too much to do, I can't keep up.",
                aiResponse: "It sounds like you're feeling overwhelmed by the sheer volume of work, and that sense of not being able to keep up can be incredibly draining. What would it look like if you were able to keep up?",
                isTerminal: true,
              },
            ],
          },
          {
            id: "s1_optA2_boss",
            text: "My boss is putting a lot of pressure on me.",
            aiResponse: "Pressure from a boss can certainly add to that feeling of being overwhelmed. It's tough when you feel that external expectation. How does that pressure from your boss typically make you feel?",
            nextPrompt: "How does your body react to this pressure?",
            nextOptions: [
              {
                id: "s1_optA2_1_tense",
                text: "I feel tense all over.",
                aiResponse: "Feeling tense all over suggests your body is bracing against this pressure, which can be exhausting. Where do you notice that tension most in your body?",
                isTerminal: true,
              },
              {
                id: "s1_optA2_2_frustrated",
                text: "Frustrated and a bit angry.",
                aiResponse: "Frustration and anger are powerful emotions that can arise when you feel pressured or unfairly burdened. What does that frustration make you want to do?",
                isTerminal: true,
              },
            ],
          },
        ],
      },
      {
        id: "s1_optB_stressed",
        text: "A bit stressed, but managing.",
        aiResponse: "It sounds like you're acknowledging some stress but also feel you have a handle on it, which shows resilience. What helps you manage when you're feeling a bit stressed?",
        nextPrompt: "What strategies do you use?",
        nextOptions: [
          {
            id: "s1_optB1_exercise",
            text: "Exercise helps me clear my head.",
            aiResponse: "That's a great coping mechanism. Physical activity can be incredibly effective for managing stress and gaining clarity. What kind of exercise do you find most helpful?",
            isTerminal: true,
          },
          {
            id: "s1_optB2_talking_to_friend",
            text: "Talking to a friend usually helps.",
            aiResponse: "Connecting with a friend and sharing what's on your mind can be a wonderful way to process stress. What do you usually gain from those conversations?",
            isTerminal: true,
          },
        ],
      },
      {
        id: "s1_optC_good",
        text: "Actually, pretty good today!",
        aiResponse: "That's wonderful to hear you're having a pretty good day! What's contributing to you feeling good today?",
        nextPrompt: "What's making today good?",
        nextOptions: [
          {
            id: "s1_optC1_achieved_something",
            text: "I achieved something I've been working on.",
            aiResponse: "That's fantastic! A sense of accomplishment can really lift your spirits. What was it that you achieved?",
            isTerminal: true,
          },
          {
            id: "s1_optC2_spent_time_outside",
            text: "I spent some time outside and it was refreshing.",
            aiResponse: "Spending time in nature can be incredibly rejuvenating. What did you notice or appreciate most during your time outside?",
            isTerminal: true,
          },
        ],
      },
    ],
  },
  // Scenario 2: Feeling Sad/Lonely
  {
    id: "scenario2_sadness",
    initialPrompt: "Is there anything in particular you'd like to talk about?",
    initialOptions: [
        {
            id: "s2_optA_sad",
            text: "I've been feeling quite sad lately.",
            aiResponse: "I hear that you've been carrying a feeling of sadness with you. That must be tough. What is that sadness like for you when it's present?",
            nextPrompt: "How would you describe that sadness?",
            nextOptions: [
                {
                    id: "s2_optA1_cloud",
                    text: "It's like a heavy cloud.",
                    aiResponse: "A 'heavy cloud' is a powerful way to describe it. That really conveys a sense of weight and darkness. When that cloud feels heaviest, what do you notice about your energy or motivation?",
                    isTerminal: false,
                    nextPrompt: "And what impact does that have on you?",
                    nextOptions: [
                      {
                        id: "s2_optA1_1_no_energy",
                        text: "I have no energy to do anything.",
                        aiResponse: "Having no energy when a heavy cloud of sadness is present can make everything feel incredibly difficult, even simple tasks. What do you wish you had the energy to do?",
                        isTerminal: true,
                      },
                      {
                        id: "s2_optA1_2_hard_to_focus",
                        text: "It's hard to focus on anything.",
                        aiResponse: "Difficulty focusing when sadness is present is a very common experience. It can feel like your mind is clouded, making it hard to engage with tasks or even conversations. What do you usually try to do when you notice your focus drifting?",
                        isTerminal: true,
                      },
                    ],
                },
                {
                    id: "s2_optA2_lonely",
                    text: "I also feel very lonely with it.",
                    aiResponse: "That sense of loneliness on top of sadness sounds incredibly difficult to navigate. It's really hard to feel alone with heavy emotions. When that loneliness is strongest, what do you notice about your thoughts or what you feel like doing?",
                    isTerminal: false,
                    nextPrompt: "What kind of thoughts come up when you feel lonely?",
                    nextOptions: [
                      {
                        id: "s2_optA2_1_no_one_cares",
                        text: "That no one truly cares about me.",
                        aiResponse: "It sounds incredibly painful when those thoughts of 'no one truly cares' arise, especially when you're already feeling lonely. Those thoughts can feel very convincing in the moment. What happens for you when you believe that thought?",
                        isTerminal: true,
                      },
                      {
                        id: "s2_optA2_2_isolated",
                        text: "I feel more isolated.",
                        aiResponse: "Feeling more isolated when loneliness is strong can be a very difficult cycle. It can make reaching out feel even harder. What does that increased sense of isolation make you want to do?",
                        isTerminal: true,
                      },
                    ],
                }
            ]
        },
        {
            id: "s2_optB_argument",
            text: "Thinking about a difficult conversation I had.",
            aiResponse: "Difficult conversations can certainly linger on our minds and leave us with a lot to process. What about that conversation feels most difficult for you as you reflect on it now?",
            nextPrompt: "What made it so difficult?",
            nextOptions: [
              {
                id: "s2_optB1_misunderstanding",
                text: "There was a big misunderstanding.",
                aiResponse: "Misunderstandings in conversations can be incredibly frustrating and leave you feeling unheard or misjudged. What do you think led to the misunderstanding?",
                isTerminal: true,
              },
              {
                id: "s2_optB2_felt_attacked",
                text: "I felt attacked or blamed.",
                aiResponse: "Feeling attacked or blamed in a conversation can be a very hurtful and disempowering experience. It's natural to feel defensive when that happens. What impact did feeling attacked have on you during or after the conversation?",
                isTerminal: true,
              },
            ],
        }
    ]
  },
  // Scenario 3: Self-Criticism
  {
    id: "scenario3_mistake",
    initialPrompt: "What's been on your mind recently?",
    initialOptions: [
      {
        id: "s3_optA_mistake",
        text: "I made a mistake, and I feel terrible about it.",
        aiResponse: "It sounds like you're being quite hard on yourself for that mistake, and it's left you feeling terrible. It's understandable to feel that way when we think we've done something wrong. What kind of thoughts are coming up for you about the mistake?",
        nextPrompt: "What are those thoughts telling you?",
        nextOptions: [
          {
            id: "s3_optA1_stupid",
            text: "I feel so stupid.",
            aiResponse: "That's a really harsh judgment on yourself, to feel 'stupid.' Those kinds of self-critical thoughts can be very painful. When that thought 'I feel so stupid' comes up, what other emotions accompany it for you?",
            isTerminal: false,
            nextPrompt: "What other emotions come up with that thought?",
            nextOptions: [
              {
                id: "s3_optA1_1_shame",
                text: "Shame and embarrassment.",
                aiResponse: "Shame and embarrassment are incredibly difficult emotions to carry, especially when they stem from self-criticism. It sounds like you're experiencing a deep sense of discomfort. What does shame compel you to do or avoid doing?",
                isTerminal: true,
              },
              {
                id: "s3_optA1_2_helplessness",
                text: "Helplessness, like I can't change anything.",
                aiResponse: "That feeling of helplessness can be very paralyzing, making it seem impossible to move forward or make changes. It's understandable to feel stuck when that's present. What do you do when you feel helpless?",
                isTerminal: true,
              },
            ],
          },
          {
            id: "s3_optA2_others_think",
            text: "I'm worried about what others will think.",
            aiResponse: "Ah, that concern about how others perceive us after a mistake is very common and can add a lot of pressure. What specifically are you worried they might be thinking or saying?",
            isTerminal: false,
            nextPrompt: "What are your specific worries about what others might think?",
            nextOptions: [
              {
                id: "s3_optA2_1_lose_respect",
                text: "That they'll lose respect for me.",
                aiResponse: "The fear of losing respect from others can be very powerful, especially when you've invested a lot in how you're perceived. How would losing their respect impact you?",
                isTerminal: true,
              },
              {
                id: "s3_optA2_2_judge_me",
                text: "That they'll judge me harshly.",
                aiResponse: "The thought of being judged harshly can bring a lot of anxiety and make you want to withdraw. What would a harsh judgment feel like to you?",
                isTerminal: true,
              },
            ],
          },
        ],
      },
      {
        id: "s3_optB_event_worry",
        text: "I'm worried about an upcoming event.",
        aiResponse: "Upcoming events, especially important ones, can definitely bring a sense of worry or anticipation. What is it about this particular event that's on your mind?",
        isTerminal: false,
        nextPrompt: "What aspects of the event are causing worry?",
        nextOptions: [
          {
            id: "s3_optB1_performance",
            text: "I have to perform or present something.",
            aiResponse: "Performing or presenting can bring a unique set of anxieties, especially when you feel like you're under scrutiny. What specific worries come up about your performance?",
            isTerminal: true,
          },
          {
            id: "s3_optB2_social",
            text: "It's a social gathering, and I'm worried about fitting in.",
            aiResponse: "Social gatherings can certainly be a source of worry, especially when there's a concern about fitting in or being accepted. What makes you worried about fitting in?",
            isTerminal: true,
          },
        ],
      },
    ],
  },
  // Scenario 4: Anxiety about an Unknown
  {
    id: "scenario4_anxiety_unknown",
    initialPrompt: "How are you feeling right now?",
    initialOptions: [
      {
        id: "s4_optA_anxious_unknown",
        text: "I'm feeling anxious about something, but I'm not sure what.",
        aiResponse: "That feeling of anxiety without a clear source can be really unsettling. It's like having a sense of unease that's hard to pin down. When you notice that anxiety, what does it physically feel like for you, if anything?",
        nextPrompt: "What do you notice in your body?",
        nextOptions: [
          {
            id: "s4_optA1_heart_races",
            text: "My heart races a bit.",
            aiResponse: "A racing heart is a very common physical sign when anxiety is present. It sounds like your body is really reacting to that feeling of unease. Besides the physical sensation, what thoughts, if any, tend to surface when you notice your heart racing like that?",
            isTerminal: false,
            nextPrompt: "What thoughts come with the racing heart?",
            nextOptions: [
              {
                id: "s4_optA1_1_impending_doom",
                text: "Like something bad is going to happen.",
                aiResponse: "That sense of impending doom or that something bad is about to happen can be incredibly frightening when anxiety is high. It's a very intense feeling. What do you usually do when those thoughts take hold?",
                isTerminal: true,
              },
              {
                id: "s4_optA1_2_cant_breathe",
                text: "I feel like I can't breathe properly.",
                aiResponse: "Feeling like you can't breathe properly can be a very alarming physical symptom of anxiety. It's a scary sensation. What thoughts come up for you when you feel that way?",
                isTerminal: true,
              },
            ],
          },
          {
            id: "s4_optA2_restless",
            text: "I just feel restless all over.",
            aiResponse: "That sense of restlessness all over can be very distracting and uncomfortable when anxiety is around. What does that restlessness make you want to do, or stop you from doing?",
            isTerminal: false,
            nextPrompt: "What impact does the restlessness have?",
            nextOptions: [
              {
                id: "s4_optA2_1_cant_sit_still",
                text: "I can't seem to sit still.",
                aiResponse: "Not being able to sit still when you're restless can be incredibly frustrating. It's as if your body needs to move, but there's no clear direction. What kind of activities do you find helpful when you feel the need to move?",
                isTerminal: true,
              },
              {
                id: "s4_optA2_2_fidgety",
                text: "I feel fidgety and distracted.",
                aiResponse: "Feeling fidgety and distracted can make it hard to focus on tasks or even just relax. It sounds like your mind and body are both quite active with this anxiety. What do you try to do to manage the distraction?",
                isTerminal: true,
              },
            ],
          },
        ],
      },
      {
        id: "s4_optB_excited",
        text: "I'm excited about a new project!",
        aiResponse: "That's great to hear! Excitement about a new project can be very energizing. What part of it are you most looking forward to?",
        isTerminal: false,
        nextPrompt: "What aspects of the project excite you most?",
        nextOptions: [
          {
            id: "s4_optB1_learning",
            text: "The opportunity to learn new things.",
            aiResponse: "Learning new things can be incredibly stimulating and rewarding. What kind of new knowledge or skills are you hoping to gain?",
            isTerminal: true,
          },
          {
            id: "s4_optB2_creativity",
            text: "Being able to be creative.",
            aiResponse: "Expressing your creativity can be a wonderful source of joy and fulfillment. What kind of creative outlets do you enjoy most in your projects?",
            isTerminal: true,
          },
        ],
      },
    ],
  },
  // Scenario 5: User Shares a Small Positive
  {
    id: "scenario5_small_positive",
    initialPrompt: "How has your day been going?",
    initialOptions: [
      {
        id: "s5_optA_small_good",
        text: "Mostly tough, but one small good thing happened.",
        aiResponse: "I hear that it's been mostly tough, and I'm also sensing that this one small good thing stands out to you. Sometimes those small moments can be quite meaningful. If you're comfortable, I'd be interested to hear about that good thing.",
        nextPrompt: "What was that small good thing?",
        nextOptions: [
          {
            id: "s5_optA1_kind_message",
            text: "My friend sent me a kind message.",
            aiResponse: "A kind message from a friend can really make a difference, especially on a tough day. That sounds like a lovely moment of connection. How did receiving that message make you feel?",
            isTerminal: false,
            nextPrompt: "How did that message make you feel?",
            nextOptions: [
              {
                id: "s5_optA1_1_grateful",
                text: "Grateful and supported.",
                aiResponse: "Feeling grateful and supported can be incredibly uplifting, especially when you're going through a tough time. It sounds like that message was a real boost. What kind of support do you value most from your friends?",
                isTerminal: true,
              },
              {
                id: "s5_optA1_2_less_alone",
                text: "A little less alone.",
                aiResponse: "Feeling a little less alone can make a huge difference when you're going through a difficult day. It sounds like that message helped you feel more connected. What does feeling connected mean to you?",
                isTerminal: true,
              },
            ],
          },
          {
            id: "s5_optA2_task_finished",
            text: "I managed to finish a task I was avoiding.",
            aiResponse: "Finishing a task you've been avoiding can bring such a sense of relief and accomplishment! That's a great step. What was it like for you to get that done?",
            isTerminal: false,
            nextPrompt: "What was the feeling after finishing it?",
            nextOptions: [
              {
                id: "s5_optA2_1_relief",
                text: "Pure relief.",
                aiResponse: "Pure relief after completing something you've been avoiding is a wonderful feeling. It's like a weight has been lifted. What other feelings accompany that relief?",
                isTerminal: true,
              },
              {
                id: "s5_optA2_2_proud",
                text: "Proud of myself.",
                aiResponse: "Feeling proud of yourself for tackling an avoided task is a fantastic accomplishment! That sense of self-worth is so important. What does being proud of yourself feel like?",
                isTerminal: true,
              },
            ],
          },
        ],
      },
      {
        id: "s5_optB_difficult_day",
        text: "It's been a really difficult day.",
        aiResponse: "I'm sorry to hear it's been a really difficult day for you. That sounds hard. What's been making it feel so tough?",
        isTerminal: false,
        nextPrompt: "What contributed to the difficulty?",
        nextOptions: [
          {
            id: "s5_optB1_conflict",
            text: "I had a conflict with someone.",
            aiResponse: "Conflicts can be very emotionally draining and leave us feeling upset or misunderstood. What impact did that conflict have on you?",
            isTerminal: true,
          },
          {
            id: "s5_optB2_bad_news",
            text: "I received some bad news.",
            aiResponse: "Receiving bad news can certainly make a day feel incredibly difficult and heavy. What was your initial reaction to the news?",
            isTerminal: true,
          },
        ],
      },
    ],
  },
]; 