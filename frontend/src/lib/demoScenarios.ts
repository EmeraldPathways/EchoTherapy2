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
            isTerminal: true,
          },
          {
            id: "s1_optA2_boss",
            text: "My boss is putting a lot of pressure on me.",
            aiResponse: "Pressure from a boss can certainly add to that feeling of being overwhelmed. It's tough when you feel that external expectation. How does that pressure from your boss typically make you feel?",
            isTerminal: true,
          },
        ],
      },
      {
        id: "s1_optB_stressed",
        text: "A bit stressed, but managing.",
        aiResponse: "It sounds like you're acknowledging some stress but also feel you have a handle on it, which shows resilience. What helps you manage when you're feeling a bit stressed?",
        isTerminal: true,
      },
      {
        id: "s1_optC_good",
        text: "Actually, pretty good today!",
        aiResponse: "That's wonderful to hear you're having a pretty good day! What's contributing to you feeling good today?",
        isTerminal: true,
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
                    isTerminal: true,
                },
                {
                    id: "s2_optA2_lonely",
                    text: "I also feel very lonely with it.",
                    aiResponse: "That sense of loneliness on top of sadness sounds incredibly difficult to navigate. It's really hard to feel alone with heavy emotions. When that loneliness is strongest, what do you notice about your thoughts or what you feel like doing?",
                    isTerminal: true,
                }
            ]
        },
        {
            id: "s2_optB_argument",
            text: "Thinking about a difficult conversation I had.",
            aiResponse: "Difficult conversations can certainly linger on our minds and leave us with a lot to process. What about that conversation feels most difficult for you as you reflect on it now?",
            isTerminal: true,
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
            isTerminal: true,
          },
          {
            id: "s3_optA2_others_think",
            text: "I'm worried about what others will think.",
            aiResponse: "Ah, that concern about how others perceive us after a mistake is very common and can add a lot of pressure. What specifically are you worried they might be thinking or saying?",
            isTerminal: true,
          },
        ],
      },
      {
        id: "s3_optB_event_worry",
        text: "I'm worried about an upcoming event.",
        aiResponse: "Upcoming events, especially important ones, can definitely bring a sense of worry or anticipation. What is it about this particular event that's on your mind?",
        isTerminal: true,
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
            isTerminal: true,
          },
          {
            id: "s4_optA2_restless",
            text: "I just feel restless all over.",
            aiResponse: "That sense of restlessness all over can be very distracting and uncomfortable when anxiety is around. What does that restlessness make you want to do, or stop you from doing?",
            isTerminal: true,
          },
        ],
      },
      {
        id: "s4_optB_excited",
        text: "I'm excited about a new project!",
        aiResponse: "That's great to hear! Excitement about a new project can be very energizing. What part of it are you most looking forward to?",
        isTerminal: true,
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
            isTerminal: true,
          },
          {
            id: "s5_optA2_task_finished",
            text: "I managed to finish a task I was avoiding.",
            aiResponse: "Finishing a task you've been avoiding can bring such a sense of relief and accomplishment! That's a great step. What was it like for you to get that done?",
            isTerminal: true,
          },
        ],
      },
      {
        id: "s5_optB_difficult_day",
        text: "It's been a really difficult day.",
        aiResponse: "I'm sorry to hear it's been a really difficult day for you. That sounds hard. What's been making it feel so tough?",
        isTerminal: true,
      },
    ],
  },
]; 