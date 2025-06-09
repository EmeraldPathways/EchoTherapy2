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
                    isTerminal: false,
                    nextPrompt: "What helps you cope with that tightness?",
                    nextOptions: [
                      {
                        id: "s1_optA1_1_1_1_deep_breaths",
                        text: "I try to take deep breaths.",
                        aiResponse: "Deep breaths can be a powerful way to calm your nervous system and ease physical tension. What do you notice when you focus on your breath?",
                        isTerminal: false,
                        nextPrompt: "What sensation comes with focusing on your breath?",
                        nextOptions: [
                          {
                            id: "s1_optA1_1_1_1_1_calm",
                            text: "A sense of calm.",
                            aiResponse: "That feeling of calm sounds like a welcome contrast to the tightness you mentioned. What does that sense of calm allow you to do or feel?",
                            isTerminal: false,
                            nextPrompt: "How does this sense of calm manifest in your actions or perspective?",
                            nextOptions: [
                              {
                                id: "s1_optA1_1_1_1_1_1_more_patient",
                                text: "I feel more patient with myself and others.",
                                aiResponse: "Patience, especially with oneself, is a profound outcome of finding inner calm. What situations do you find yourself being more patient in now?",
                                isTerminal: true,
                              },
                              {
                                id: "s1_optA1_1_1_1_1_2_better_decisions",
                                text: "I can make better decisions.",
                                aiResponse: "A clearer mind certainly aids in decision-making. What kind of decisions feel easier or more thoughtful when you are calm?",
                                isTerminal: true,
                              },
                            ],
                          },
                          {
                            id: "s1_optA1_1_1_1_2_still_anxious",
                            text: "I still feel anxious.",
                            aiResponse: "It's understandable that even with deep breaths, some anxiety might linger. What does that anxiety feel like in your body when you breathe?",
                            isTerminal: false,
                            nextPrompt: "How does that anxiety manifest physically when you breathe?",
                            nextOptions: [
                              {
                                id: "s1_optA1_1_1_1_2_1_shallow",
                                text: "My breaths become shallow.",
                                aiResponse: "Shallow breathing often accompanies anxiety, making it harder to feel settled. What impact does that shallow breathing have on your overall sense of well-being?",
                                isTerminal: true,
                              },
                              {
                                id: "s1_optA1_1_1_1_2_2_heart_race",
                                text: "My heart races.",
                                aiResponse: "A racing heart is a clear signal from your body that it's in a state of heightened alert. What thoughts or worries tend to accompany that racing heart?",
                                isTerminal: true,
                              },
                            ],
                          },
                          {
                            id: "s1_optA1_1_1_2_distract_myself",
                            text: "I try to distract myself.",
                            aiResponse: "Distraction can offer a temporary reprieve from uncomfortable sensations. What kind of distractions do you find yourself turning to?",
                            isTerminal: false,
                            nextPrompt: "What specific distractions do you typically use?",
                            nextOptions: [
                              {
                                id: "s1_optA1_1_1_2_1_tv",
                                text: "Watching TV or movies.",
                                aiResponse: "Watching TV or movies can be an effective way to shift your focus. What kind of shows or movies do you find most helpful for distraction?",
                                isTerminal: true,
                              },
                              {
                                id: "s1_optA1_1_1_2_2_social_media",
                                text: "Scrolling social media.",
                                aiResponse: "Scrolling social media can be a quick way to disengage, but sometimes it can also lead to other feelings. What do you notice after you've been on social media for a while?",
                                isTerminal: true,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: "s1_optA1_2_1_project_deadlines",
                        text: "Meeting project deadlines.",
                        aiResponse: "Project deadlines can certainly create a sense of urgency and pressure. How do you typically approach managing multiple deadlines at once?",
                        isTerminal: false,
                        nextPrompt: "What methods do you use to manage deadlines?",
                        nextOptions: [
                          {
                            id: "s1_optA1_2_1_1_to_do_list",
                            text: "I make detailed to-do lists.",
                            aiResponse: "To-do lists can be very effective for organizing tasks and maintaining a sense of control. What makes a to-do list most effective for you?",
                            isTerminal: true,
                          },
                          {
                            id: "s1_optA1_2_1_2_prioritization",
                            text: "I prioritize tasks by urgency.",
                            aiResponse: "Prioritizing by urgency is a smart strategy to tackle high-pressure tasks. How do you decide what's truly urgent versus important?",
                            isTerminal: true,
                          },
                        ],
                      },
                      {
                        id: "s1_optA1_2_2_email_backlog",
                        text: "Clearing my email backlog.",
                        aiResponse: "An overflowing email inbox can definitely contribute to feeling overwhelmed. What makes clearing that backlog feel particularly challenging right now?",
                        isTerminal: false,
                        nextPrompt: "What are the main obstacles to clearing your email backlog?",
                        nextOptions: [
                          {
                            id: "s1_optA1_2_2_1_volume",
                            text: "The sheer volume of emails.",
                            aiResponse: "The sheer volume of emails can feel daunting, making it hard to even know where to start. How do you usually react when faced with such a large number of unread emails?",
                            isTerminal: true,
                          },
                          {
                            id: "s1_optA1_2_2_2_decision_fatigue",
                            text: "Decision fatigue from each email.",
                            aiResponse: "Decision fatigue from emails is a real challenge, as each one can require a mental effort to process. What kind of decisions in emails do you find most draining?",
                            isTerminal: true,
                          },
                        ],
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
                        isTerminal: false,
                        nextPrompt: "Where in your body do you notice this tension most strongly?",
                        nextOptions: [
                          {
                            id: "s1_optA2_1_1_shoulders",
                            text: "In my shoulders and neck.",
                            aiResponse: "That's a very common area to hold tension, especially when feeling pressured. What do your shoulders and neck feel like when they're tense?",
                            isTerminal: false,
                            nextPrompt: "How does that tension impact your day-to-day activities?",
                            nextOptions: [
                              {
                                id: "s1_optA2_1_1_1_headaches",
                                text: "It gives me headaches.",
                                aiResponse: "Headaches stemming from tension can be debilitating. What do you usually do to relieve those tension headaches?",
                                isTerminal: true,
                              },
                              {
                                id: "s1_optA2_1_1_2_difficulty_focusing",
                                text: "I have difficulty focusing.",
                                aiResponse: "Difficulty focusing when your body is tense is very understandable, as your energy is being spent elsewhere. What do you find yourself doing when you notice your focus slipping due to tension?",
                                isTerminal: true,
                              },
                            ],
                          },
                          {
                            id: "s1_optA2_1_2_jaw",
                            text: "My jaw is clenched.",
                            aiResponse: "A clenched jaw can be a sign of holding a lot in, perhaps even unexpressed emotions. What does that clenching sensation make you aware of?",
                            isTerminal: false,
                            nextPrompt: "What are some thoughts or feelings that come up when you notice your jaw is clenched?",
                            nextOptions: [
                              {
                                id: "s1_optA2_1_2_1_frustration",
                                text: "Frustration or anger.",
                                aiResponse: "Frustration and anger can often be held in the body, and the jaw is a common place for that. What triggers these feelings for you?",
                                isTerminal: false,
                                nextPrompt: "What specific situations or thoughts tend to trigger your frustration or anger?",
                                nextOptions: [
                                  {
                                    id: "s1_optA2_1_2_1_1_unmet_expectations",
                                    text: "Unmet expectations from others.",
                                    aiResponse: "When expectations are unmet, it's natural to feel frustrated. What happens when you realize your expectations of others aren't being met?",
                                    isTerminal: true,
                                  },
                                  {
                                    id: "s1_optA2_1_2_1_2_feeling_controlled",
                                    text: "Feeling controlled or micromanaged.",
                                    aiResponse: "Feeling controlled or micromanaged can be incredibly disempowering and ignite anger. What impact does that feeling have on your motivation or autonomy?",
                                    isTerminal: true,
                                  },
                                ],
                              },
                              {
                                id: "s1_optA2_1_2_2_stress",
                                text: "Just general stress.",
                                aiResponse: "It sounds like your jaw clenching is a clear indicator of overall stress. What kind of situations typically heighten your general stress levels?",
                                isTerminal: true,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: "s1_optA2_2_frustrated",
                        text: "Frustrated and a bit angry.",
                        aiResponse: "Frustration and anger are powerful emotions that can arise when you feel pressured or unfairly burdened. What does that frustration make you want to do?",
                        isTerminal: false,
                        nextPrompt: "What actions does that frustration or anger typically prompt you to take?",
                        nextOptions: [
                          {
                            id: "s1_optA2_2_1_confront",
                            text: "Confront the person causing it.",
                            aiResponse: "Confrontation can be a direct way to address the source of your frustration. What do you hope to achieve by confronting them?",
                            isTerminal: false,
                            nextPrompt: "What are your desired outcomes from confronting them?",
                            nextOptions: [
                              {
                                id: "s1_optA2_2_1_1_resolution",
                                text: "A clear resolution to the issue.",
                                aiResponse: "A clear resolution can bring a sense of closure and fairness. What would a fair resolution look like in this situation?",
                                isTerminal: true,
                              },
                              {
                                id: "s1_optA2_2_1_2_feeling_heard",
                                text: "To feel heard and respected.",
                                aiResponse: "Feeling heard and respected is crucial for healthy communication. What makes you feel heard and respected in a conversation?",
                                isTerminal: true,
                              },
                            ],
                          },
                          {
                            id: "s1_optA2_2_2_withdraw",
                            text: "Withdraw and avoid the situation.",
                            aiResponse: "Withdrawing can be a way to protect yourself from further discomfort. What is the impact of withdrawing on your feelings of frustration or anger?",
                            isTerminal: false,
                            nextPrompt: "What is the long-term impact of withdrawing on your feelings or the situation?",
                            nextOptions: [
                              {
                                id: "s1_optA2_2_2_1_increased_stress",
                                text: "It just increases my stress later.",
                                aiResponse: "Increased stress later on is a common consequence of avoiding issues. What ways do you typically manage that build-up of stress?",
                                isTerminal: true,
                              },
                              {
                                id: "s1_optA2_2_2_2_unresolved",
                                text: "The issue remains unresolved.",
                                aiResponse: "When issues remain unresolved, they can continue to weigh on you. What impact does having unresolved issues have on your peace of mind?",
                                isTerminal: true,
                              },
                            ],
                          },
                        ],
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
                    isTerminal: false,
                    nextPrompt: "What specific type of exercise gives you the most relief?",
                    nextOptions: [
                      {
                        id: "s1_optB1_1_running",
                        text: "Running or cardio.",
                        aiResponse: "Running can be a powerful way to release pent-up energy and clear your mind. What do you notice about your thoughts or feelings while you're running?",
                        isTerminal: false,
                        nextPrompt: "How do your thoughts or feelings shift during your run?",
                        nextOptions: [
                          {
                            id: "s1_optB1_1_1_less_stressed",
                            text: "I feel less stressed and more focused.",
                            aiResponse: "That shift to feeling less stressed and more focused sounds incredibly beneficial. How does that clarity impact your approach to daily challenges?",
                            isTerminal: true,
                          },
                          {
                            id: "s1_optB1_1_2_distraction",
                            text: "It's a good distraction from my worries.",
                            aiResponse: "Distraction can offer a valuable break from persistent worries. What happens when you return to your worries after a good run?",
                            isTerminal: true,
                          },
                        ],
                      },
                      {
                        id: "s1_optB1_2_yoga",
                        text: "Yoga or stretching.",
                        aiResponse: "Yoga and stretching are excellent for both physical and mental flexibility. How does connecting with your body through these practices impact your stress levels?",
                        isTerminal: false,
                        nextPrompt: "What specific benefits do you feel from practicing yoga or stretching?",
                        nextOptions: [
                          {
                            id: "s1_optB1_2_1_release_tension",
                            text: "It helps me release physical tension.",
                            aiResponse: "Releasing physical tension through yoga or stretching can be incredibly therapeutic. Where do you typically hold tension in your body, and what does it feel like to release it?",
                            isTerminal: true,
                          },
                          {
                            id: "s1_optB1_2_2_mental_calm",
                            text: "It brings a sense of mental calm.",
                            aiResponse: "A sense of mental calm from these practices is a wonderful outcome. How does that mental calm influence your overall emotional state?",
                            isTerminal: true,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "s1_optB2_talking_to_friend",
                    text: "Talking to a friend usually helps.",
                    aiResponse: "Connecting with a friend and sharing what's on your mind can be a wonderful way to process stress. What do you usually gain from those conversations?",
                    isTerminal: false,
                    nextPrompt: "What specific support or insights do you gain from talking to friends?",
                    nextOptions: [
                      {
                        id: "s1_optB2_1_perspective",
                        text: "A new perspective on things.",
                        aiResponse: "Gaining a fresh perspective can be incredibly valuable when you're feeling stressed. What new perspectives have you found particularly helpful recently?",
                        isTerminal: false,
                        nextPrompt: "What kind of new perspectives have been most impactful for you?",
                        nextOptions: [
                          {
                            id: "s1_optB2_1_1_reframe",
                            text: "Reframing the problem.",
                            aiResponse: "Reframing a problem can completely shift your approach and emotional response. What specific aspects of the problem become clearer after reframing it?",
                            isTerminal: true,
                          },
                          {
                            id: "s1_optB2_1_2_actionable_steps",
                            text: "Identifying actionable steps.",
                            aiResponse: "Identifying actionable steps can turn overwhelming feelings into a sense of control and progress. What kinds of steps become visible to you when you have a fresh perspective?",
                            isTerminal: true,
                          },
                        ],
                      },
                      {
                        id: "s1_optB2_2_feel_heard",
                        text: "Just feeling heard and understood.",
                        aiResponse: "Feeling heard and understood is a fundamental human need and can be deeply comforting. What does it feel like for you to be truly heard by someone?",
                        isTerminal: false,
                        nextPrompt: "How does it feel when you are truly heard and understood by someone?",
                        nextOptions: [
                          {
                            id: "s1_optB2_2_1_validation",
                            text: "A sense of validation.",
                            aiResponse: "Validation can be incredibly powerful, especially when you're navigating difficult emotions. What does that sense of validation allow you to do or feel?",
                            isTerminal: true,
                          },
                          {
                            id: "s1_optB2_2_2_less_alone",
                            text: "Less alone with my thoughts.",
                            aiResponse: "Feeling less alone with your thoughts can be a profound relief, as it breaks the isolation that stress can create. What impact does that reduced sense of isolation have on your overall well-being?",
                            isTerminal: true,
                          },
                        ],
                      },
                    ],
                  },
                ],
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
                isTerminal: false,
                nextPrompt: "What was the nature of this accomplishment?",
                nextOptions: [
                  {
                    id: "s1_optC1_1_work_project",
                    text: "A challenging work project.",
                    aiResponse: "Successfully completing a challenging work project can be incredibly rewarding. What did you learn about yourself through that process?",
                    isTerminal: false,
                    nextPrompt: "What key lessons did you take away from completing this challenging project?",
                    nextOptions: [
                      {
                        id: "s1_optC1_1_1_resilience",
                        text: "My own resilience and problem-solving skills.",
                        aiResponse: "Recognizing your resilience and problem-solving skills is a powerful insight. How do you think this newfound awareness will help you in future challenges?",
                        isTerminal: true,
                      },
                      {
                        id: "s1_optC1_1_2_importance_of_planning",
                        text: "The importance of better planning and time management.",
                        aiResponse: "Learning the value of planning and time management can be a game-changer for future projects. What specific planning or time management strategies are you considering implementing?",
                        isTerminal: true,
                      },
                    ],
                  },
                  {
                    id: "s1_optC1_2_personal_goal",
                    text: "A personal goal I set for myself.",
                    aiResponse: "Achieving a personal goal is a significant step towards self-improvement and can build great confidence. What motivated you to pursue this particular goal?",
                    isTerminal: false,
                    nextPrompt: "What was your main motivation for pursuing this personal goal?",
                    nextOptions: [
                      {
                        id: "s1_optC1_2_1_self_improvement",
                        text: "To improve myself or a skill.",
                        aiResponse: "A desire for self-improvement is a powerful motivator. What specific aspects of yourself or your skills were you aiming to enhance?",
                        isTerminal: true,
                      },
                      {
                        id: "s1_optC1_2_2_personal_satisfaction",
                        text: "For personal satisfaction and happiness.",
                        aiResponse: "Pursuing goals for personal satisfaction and happiness is a wonderful way to invest in your well-being. What kind of satisfaction or happiness did achieving this goal bring you?",
                        isTerminal: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: "s1_optC2_spent_time_outside",
                text: "I spent some time outside and it was refreshing.",
                aiResponse: "Spending time in nature can be incredibly rejuvenating. What did you notice or appreciate most during your time outside?",
                isTerminal: false,
                nextPrompt: "What specific aspects of being outside did you find most refreshing?",
                nextOptions: [
                  {
                    id: "s1_optC2_1_nature_sounds",
                    text: "The sounds of nature (birds, wind, water).",
                    aiResponse: "The sounds of nature can be incredibly soothing and help you feel more grounded. What do you feel when you immerse yourself in those natural sounds?",
                    isTerminal: false,
                    nextPrompt: "How do those natural sounds specifically affect your emotions or state of mind?",
                    nextOptions: [
                      {
                        id: "s1_optC2_1_1_peaceful",
                        text: "A sense of peace and tranquility.",
                        aiResponse: "That sense of peace and tranquility sounds like a wonderful escape. How does this peaceful feeling influence your perspective on your day or worries?",
                        isTerminal: true,
                      },
                      {
                        id: "s1_optC2_1_2_connected",
                        text: "More connected to the world.",
                        aiResponse: "Feeling more connected to the world can be incredibly grounding and reduce feelings of isolation. What does that connection feel like for you?",
                        isTerminal: true,
                      },
                    ],
                  },
                  {
                    id: "s1_optC2_2_fresh_air",
                    text: "The fresh air and sunlight.",
                    aiResponse: "Fresh air and sunlight can really invigorate the senses and lift your mood. How does that physical sensation of fresh air and sunlight impact your overall well-being?",
                    isTerminal: false,
                    nextPrompt: "What specific positive impacts do you notice from the fresh air and sunlight?",
                    nextOptions: [
                      {
                        id: "s1_optC2_2_1_energy_boost",
                        text: "An immediate energy boost.",
                        aiResponse: "An immediate energy boost from fresh air and sunlight can be incredibly revitalizing. How does this burst of energy help you approach the rest of your day?",
                        isTerminal: true,
                      },
                      {
                        id: "s1_optC2_2_2_mood_improvement",
                        text: "A noticeable improvement in my mood.",
                        aiResponse: "A noticeable improvement in your mood is a wonderful benefit of being outdoors. How does this improved mood affect your interactions with others or your own thoughts?",
                        isTerminal: true,
                      },
                    ],
                  },
                ],
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
            isTerminal: false,
            nextPrompt: "What specific type of exercise gives you the most relief?",
            nextOptions: [
              {
                id: "s1_optB1_1_running",
                text: "Running or cardio.",
                aiResponse: "Running can be a powerful way to release pent-up energy and clear your mind. What do you notice about your thoughts or feelings while you're running?",
                isTerminal: false,
                nextPrompt: "How do your thoughts or feelings shift during your run?",
                nextOptions: [
                  {
                    id: "s1_optB1_1_1_less_stressed",
                    text: "I feel less stressed and more focused.",
                    aiResponse: "That shift to feeling less stressed and more focused sounds incredibly beneficial. How does that clarity impact your approach to daily challenges?",
                    isTerminal: true,
                  },
                  {
                    id: "s1_optB1_1_2_distraction",
                    text: "It's a good distraction from my worries.",
                    aiResponse: "Distraction can offer a valuable break from persistent worries. What happens when you return to your worries after a good run?",
                    isTerminal: true,
                  },
                ],
              },
              {
                id: "s1_optB1_2_yoga",
                text: "Yoga or stretching.",
                aiResponse: "Yoga and stretching are excellent for both physical and mental flexibility. How does connecting with your body through these practices impact your stress levels?",
                isTerminal: false,
                nextPrompt: "What specific benefits do you feel from practicing yoga or stretching?",
                nextOptions: [
                  {
                    id: "s1_optB1_2_1_release_tension",
                    text: "It helps me release physical tension.",
                    aiResponse: "Releasing physical tension through yoga or stretching can be incredibly therapeutic. Where do you typically hold tension in your body, and what does it feel like to release it?",
                    isTerminal: true,
                  },
                  {
                    id: "s1_optB1_2_2_mental_calm",
                    text: "It brings a sense of mental calm.",
                    aiResponse: "A sense of mental calm from these practices is a wonderful outcome. How does that mental calm influence your overall emotional state?",
                    isTerminal: true,
                  },
                ],
              },
            ],
          },
          {
            id: "s1_optB2_talking_to_friend",
            text: "Talking to a friend usually helps.",
            aiResponse: "Connecting with a friend and sharing what's on your mind can be a wonderful way to process stress. What do you usually gain from those conversations?",
            isTerminal: false,
            nextPrompt: "What specific support or insights do you gain from talking to friends?",
            nextOptions: [
              {
                id: "s1_optB2_1_perspective",
                text: "A new perspective on things.",
                aiResponse: "Gaining a fresh perspective can be incredibly valuable when you're feeling stressed. What new perspectives have you found particularly helpful recently?",
                isTerminal: false,
                nextPrompt: "What kind of new perspectives have been most impactful for you?",
                nextOptions: [
                  {
                    id: "s1_optB2_1_1_reframe",
                    text: "Reframing the problem.",
                    aiResponse: "Reframing a problem can completely shift your approach and emotional response. What specific aspects of the problem become clearer after reframing it?",
                    isTerminal: true,
                  },
                  {
                    id: "s1_optB2_1_2_actionable_steps",
                    text: "Identifying actionable steps.",
                    aiResponse: "Identifying actionable steps can turn overwhelming feelings into a sense of control and progress. What kinds of steps become visible to you when you have a fresh perspective?",
                    isTerminal: true,
                  },
                ],
              },
              {
                id: "s1_optB2_2_feel_heard",
                text: "Just feeling heard and understood.",
                aiResponse: "Feeling heard and understood is a fundamental human need and can be deeply comforting. What does it feel like for you to be truly heard by someone?",
                isTerminal: false,
                nextPrompt: "How does it feel when you are truly heard and understood by someone?",
                nextOptions: [
                  {
                    id: "s1_optB2_2_1_validation",
                    text: "A sense of validation.",
                    aiResponse: "Validation can be incredibly powerful, especially when you're navigating difficult emotions. What does that sense of validation allow you to do or feel?",
                    isTerminal: true,
                  },
                  {
                    id: "s1_optB2_2_2_less_alone",
                    text: "Less alone with my thoughts.",
                    aiResponse: "Feeling less alone with your thoughts can be a profound relief, as it breaks the isolation that stress can create. What impact does that reduced sense of isolation have on your overall well-being?",
                    isTerminal: true,
                  },
                ],
              },
            ],
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
            isTerminal: false,
            nextPrompt: "What was the nature of this accomplishment?",
            nextOptions: [
              {
                id: "s1_optC1_1_work_project",
                text: "A challenging work project.",
                aiResponse: "Successfully completing a challenging work project can be incredibly rewarding. What did you learn about yourself through that process?",
                isTerminal: false,
                nextPrompt: "What key lessons did you take away from completing this challenging project?",
                nextOptions: [
                  {
                    id: "s1_optC1_1_1_resilience",
                    text: "My own resilience and problem-solving skills.",
                    aiResponse: "Recognizing your resilience and problem-solving skills is a powerful insight. How do you think this newfound awareness will help you in future challenges?",
                    isTerminal: true,
                  },
                  {
                    id: "s1_optC1_1_2_importance_of_planning",
                    text: "The importance of better planning and time management.",
                    aiResponse: "Learning the value of planning and time management can be a game-changer for future projects. What specific planning or time management strategies are you considering implementing?",
                    isTerminal: true,
                  },
                ],
              },
              {
                id: "s1_optC1_2_personal_goal",
                text: "A personal goal I set for myself.",
                aiResponse: "Achieving a personal goal is a significant step towards self-improvement and can build great confidence. What motivated you to pursue this particular goal?",
                isTerminal: false,
                nextPrompt: "What was your main motivation for pursuing this personal goal?",
                nextOptions: [
                  {
                    id: "s1_optC1_2_1_self_improvement",
                    text: "To improve myself or a skill.",
                    aiResponse: "A desire for self-improvement is a powerful motivator. What specific aspects of yourself or your skills were you aiming to enhance?",
                    isTerminal: true,
                  },
                  {
                    id: "s1_optC1_2_2_personal_satisfaction",
                    text: "For personal satisfaction and happiness.",
                    aiResponse: "Pursuing goals for personal satisfaction and happiness is a wonderful way to invest in your well-being. What kind of satisfaction or happiness did achieving this goal bring you?",
                    isTerminal: true,
                  },
                ],
              },
            ],
          },
          {
            id: "s1_optC2_spent_time_outside",
            text: "I spent some time outside and it was refreshing.",
            aiResponse: "Spending time in nature can be incredibly rejuvenating. What did you notice or appreciate most during your time outside?",
            isTerminal: false,
            nextPrompt: "What specific aspects of being outside did you find most refreshing?",
            nextOptions: [
              {
                id: "s1_optC2_1_nature_sounds",
                text: "The sounds of nature (birds, wind, water).",
                aiResponse: "The sounds of nature can be incredibly soothing and help you feel more grounded. What do you feel when you immerse yourself in those natural sounds?",
                isTerminal: false,
                nextPrompt: "How do those natural sounds specifically affect your emotions or state of mind?",
                nextOptions: [
                  {
                    id: "s1_optC2_1_1_peaceful",
                    text: "A sense of peace and tranquility.",
                    aiResponse: "That sense of peace and tranquility sounds like a wonderful escape. How does this peaceful feeling influence your perspective on your day or worries?",
                    isTerminal: true,
                  },
                  {
                    id: "s1_optC2_1_2_connected",
                    text: "More connected to the world.",
                    aiResponse: "Feeling more connected to the world can be incredibly grounding and reduce feelings of isolation. What does that connection feel like for you?",
                    isTerminal: true,
                  },
                ],
              },
              {
                id: "s1_optC2_2_fresh_air",
                text: "The fresh air and sunlight.",
                aiResponse: "Fresh air and sunlight can really invigorate the senses and lift your mood. How does that physical sensation of fresh air and sunlight impact your overall well-being?",
                isTerminal: false,
                nextPrompt: "What specific positive impacts do you notice from the fresh air and sunlight?",
                nextOptions: [
                  {
                    id: "s1_optC2_2_1_energy_boost",
                    text: "An immediate energy boost.",
                    aiResponse: "An immediate energy boost from fresh air and sunlight can be incredibly revitalizing. How does this burst of energy help you approach the rest of your day?",
                    isTerminal: true,
                  },
                  {
                    id: "s1_optC2_2_2_mood_improvement",
                    text: "A noticeable improvement in my mood.",
                    aiResponse: "A noticeable improvement in your mood is a wonderful benefit of being outdoors. How does this improved mood affect your interactions with others or your own thoughts?",
                    isTerminal: true,
                  },
                ],
              },
            ],
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
                        isTerminal: false,
                        nextPrompt: "What specific tasks or activities do you feel unable to do due to lack of energy?",
                        nextOptions: [
                          {
                            id: "s2_optA1_1_1_socialize",
                            text: "Socialize with friends or family.",
                            aiResponse: "It's tough when sadness drains your energy for connecting with loved ones. What do you miss most about socializing when you're feeling this way?",
                            isTerminal: true,
                          },
                          {
                            id: "s2_optA1_1_2_hobbies",
                            text: "Engage in my hobbies or interests.",
                            aiResponse: "Losing interest or energy for hobbies that once brought you joy can be a clear sign of sadness. What were some of your favorite hobbies before this lack of energy set in?",
                            isTerminal: true,
                          },
                        ],
                      },
                      {
                        id: "s2_optA1_2_hard_to_focus",
                        text: "It's hard to focus on anything.",
                        aiResponse: "Difficulty focusing when sadness is present is a very common experience. It can feel like your mind is clouded, making it hard to engage with tasks or even conversations. What do you usually try to do when you notice your focus drifting?",
                        isTerminal: false,
                        nextPrompt: "What specific actions or thoughts do you typically engage in when your focus drifts?",
                        nextOptions: [
                          {
                            id: "s2_optA1_2_1_give_up",
                            text: "I tend to give up on the task.",
                            aiResponse: "It's understandable to feel like giving up when focus is hard to maintain, especially when sadness is present. What emotions or thoughts accompany that feeling of wanting to give up?",
                            isTerminal: true,
                          },
                          {
                            id: "s2_optA1_2_2_push_through",
                            text: "I try to push through it.",
                            aiResponse: "Pushing through when it's hard to focus shows a lot of determination. What strategies do you employ when you try to push through the difficulty?",
                            isTerminal: true,
                          },
                        ],
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
                        isTerminal: false,
                        nextPrompt: "What are the immediate effects on you when you believe that no one truly cares?",
                        nextOptions: [
                          {
                            id: "s2_optA2_1_1_withdrawal",
                            text: "I withdraw from others even more.",
                            aiResponse: "Withdrawing even further can create a difficult cycle, intensifying the loneliness. What does that withdrawal look like for you?",
                            isTerminal: true,
                          },
                          {
                            id: "s2_optA2_1_2_hopelessness",
                            text: "I feel a sense of hopelessness.",
                            aiResponse: "A sense of hopelessness can be incredibly heavy to carry, especially when you feel alone. What does that hopelessness make you want to do or think?",
                            isTerminal: true,
                          },
                        ],
                      },
                      {
                        id: "s2_optA2_2_isolated",
                        text: "I feel more isolated.",
                        aiResponse: "Feeling more isolated when loneliness is strong can be a very difficult cycle. It can make reaching out feel even harder. What does that increased sense of isolation make you want to do?",
                        isTerminal: false,
                        nextPrompt: "What specific actions or thoughts does this increased isolation lead to?",
                        nextOptions: [
                          {
                            id: "s2_optA2_2_1_avoid_contact",
                            text: "Avoid making any contact.",
                            aiResponse: "Avoiding contact, while perhaps feeling safer in the moment, can deepen the sense of isolation over time. What fears or concerns come up when you think about reaching out?",
                            isTerminal: true,
                          },
                          {
                            id: "s2_optA2_2_2_negative_self_talk",
                            text: "Engage in negative self-talk.",
                            aiResponse: "Negative self-talk can be a very corrosive habit, especially when you're feeling isolated. What kind of things do you say to yourself in those moments?",
                            isTerminal: true,
                          },
                        ],
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
                isTerminal: false,
                nextPrompt: "What do you believe caused the misunderstanding?",
                nextOptions: [
                  {
                    id: "s2_optB1_1_unclear_communication",
                    text: "Unclear communication from my side.",
                    aiResponse: "It takes a lot of self-awareness to consider your own role in communication. What aspects of your communication do you think might have been unclear?",
                    isTerminal: true,
                  },
                  {
                    id: "s2_optB1_2_misinterpretation",
                    text: "The other person misinterpreted me.",
                    aiResponse: "It can be frustrating when your words are misinterpreted. What do you wish they had understood differently?",
                    isTerminal: true,
                  },
                ],
              },
              {
                id: "s2_optB2_felt_attacked",
                text: "I felt attacked or blamed.",
                aiResponse: "Feeling attacked or blamed in a conversation can be a very hurtful and disempowering experience. It's natural to feel defensive when that happens. What impact did feeling attacked have on you during or after the conversation?",
                isTerminal: false,
                nextPrompt: "What was the impact of feeling attacked on your emotions or actions?",
                nextOptions: [
                  {
                    id: "s2_optB2_1_shut_down",
                    text: "I shut down and couldn't respond.",
                    aiResponse: "Shutting down in the face of feeling attacked is a common self-preservation response. What does that shutdown feel like for you?",
                    isTerminal: true,
                  },
                  {
                    id: "s2_optB2_2_anger",
                    text: "It made me angry and defensive.",
                    aiResponse: "Anger and defensiveness are natural reactions to feeling attacked. What actions did that anger or defensiveness lead to, if any?",
                    isTerminal: true,
                  },
                ],
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
                isTerminal: false,
                nextPrompt: "What actions or behaviors does shame typically lead you to?",
                nextOptions: [
                  {
                    id: "s3_optA1_1_1_hide",
                    text: "I try to hide my mistakes from others.",
                    aiResponse: "Hiding your mistakes is a common way to try and protect yourself from perceived judgment. What are your fears about what might happen if your mistakes were exposed?",
                    isTerminal: true,
                  },
                  {
                    id: "s3_optA1_1_2_avoid_situations",
                    text: "I avoid situations where I might make new mistakes.",
                    aiResponse: "Avoiding situations where you might make new mistakes is understandable, as it can feel safer. What opportunities do you feel you might be missing out on by avoiding these situations?",
                    isTerminal: true,
                  },
                ],
              },
              {
                id: "s3_optA1_2_helplessness",
                text: "Helplessness, like I can't change anything.",
                aiResponse: "That feeling of helplessness can be very paralyzing, making it seem impossible to move forward or make changes. It's understandable to feel stuck when that's present. What do you do when you feel helpless?",
                isTerminal: false,
                nextPrompt: "What are your typical responses when you feel this sense of helplessness?",
                nextOptions: [
                  {
                    id: "s3_optA1_2_1_procrastinate",
                    text: "I tend to procrastinate and delay action.",
                    aiResponse: "Procrastination can often be a way to cope with overwhelming feelings like helplessness. What happens when you delay taking action?",
                    isTerminal: true,
                  },
                  {
                    id: "s3_optA1_2_2_give_up",
                    text: "I just give up on trying.",
                    aiResponse: "Giving up can feel like the only option when helplessness is strong. What does it feel like to simply give up on trying?",
                    isTerminal: true,
                  },
                ],
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
                isTerminal: false,
                nextPrompt: "What would be the emotional or practical impact if you lost their respect?",
                nextOptions: [
                  {
                    id: "s3_optA2_1_1_damaged_reputation",
                    text: "My reputation would be damaged.",
                    aiResponse: "A damaged reputation can feel like a heavy burden, impacting how you see yourself and how you interact with the world. What does that idea of a damaged reputation bring up for you?",
                    isTerminal: true,
                  },
                  {
                    id: "s3_optA2_1_2_isolation",
                    text: "I'd feel isolated and alone.",
                    aiResponse: "Feeling isolated and alone as a result of perceived lost respect can be incredibly painful. What does that isolation make you want to do or think?",
                    isTerminal: true,
                  },
                ],
              },
              {
                id: "s3_optA2_2_judge_me",
                text: "That they'll judge me harshly.",
                aiResponse: "The fear of being judged harshly can be very powerful, often leading us to avoid certain actions or interactions. What specific judgments are you most afraid of?",
                isTerminal: false,
                nextPrompt: "What specific harsh judgments are you most afraid they'll make?",
                nextOptions: [
                  {
                    id: "s3_optA2_2_1_incompetent",
                    text: "That I'm incompetent or incapable.",
                    aiResponse: "The thought of being seen as incompetent can be deeply unsettling, especially when you strive to be capable. What does that fear of being seen as incompetent prevent you from doing?",
                    isTerminal: true,
                  },
                  {
                    id: "s3_optA2_2_2_unreliable",
                    text: "That I'm unreliable or untrustworthy.",
                    aiResponse: "Being perceived as unreliable or untrustworthy can erode confidence and make you hesitant to take on new responsibilities. How would being seen this way impact your relationships or work?",
                    isTerminal: true,
                  },
                ],
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
      {
        id: "s3_optB_procrastination",
        text: "I'm struggling with procrastination.",
        aiResponse: "Procrastination can feel like a heavy chain, making it hard to start or finish tasks. What kind of tasks do you find yourself procrastinating on most often?",
        isTerminal: false,
        nextPrompt: "What tasks do you typically procrastinate on?",
        nextOptions: [
          {
            id: "s3_optB1_work_tasks",
            text: "Work or academic assignments.",
            aiResponse: "Procrastinating on work or academic assignments can lead to increased stress and missed opportunities. What are the specific feelings or thoughts that come up when you think about these tasks?",
            isTerminal: false,
            nextPrompt: "What feelings or thoughts come up when you think about these tasks?",
            nextOptions: [
              {
                id: "s3_optB1_1_overwhelmed",
                text: "I feel overwhelmed by the amount of work.",
                aiResponse: "Feeling overwhelmed by the sheer volume of work can be a significant barrier to starting. What impact does that feeling of overwhelm have on your ability to begin?",
                isTerminal: true,
              },
              {
                id: "s3_optB1_2_fear_of_failure",
                text: "I'm afraid of failing or doing poorly.",
                aiResponse: "The fear of failure can be incredibly paralyzing, making it difficult to even attempt tasks. What does that fear make you want to do instead of working on the task?",
                isTerminal: true,
              },
            ],
          },
          {
            id: "s3_optB2_personal_chores",
            text: "Personal chores or errands.",
            aiResponse: "Even personal chores can feel overwhelming when procrastination is present. What makes these seemingly simple tasks so difficult to start?",
            isTerminal: false,
            nextPrompt: "What makes personal chores difficult to start?",
            nextOptions: [
              {
                id: "s3_optB2_1_lack_of_motivation",
                text: "Lack of motivation or energy.",
                aiResponse: "A lack of motivation or energy can make even simple chores feel like monumental tasks. What usually helps you find motivation when it's low?",
                isTerminal: true,
              },
              {
                id: "s3_optB2_2_distractions",
                text: "I get easily distracted.",
                aiResponse: "Easy distraction can certainly derail efforts to tackle chores. What kinds of distractions do you find yourself turning to when trying to do chores?",
                isTerminal: true,
              },
            ],
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
                isTerminal: false,
                nextPrompt: "What coping mechanisms do you use when these thoughts of impending doom arise?",
                nextOptions: [
                  {
                    id: "s4_optA1_1_1_distraction",
                    text: "I try to distract myself with something.",
                    aiResponse: "Distraction can be a helpful short-term coping strategy. What kinds of activities do you find most effective for distraction in those moments?",
                    isTerminal: true,
                  },
                  {
                    id: "s4_optA1_1_2_seek_reassurance",
                    text: "I seek reassurance from others.",
                    aiResponse: "Seeking reassurance from others can provide comfort and a sense of safety. What kind of reassurance do you find most helpful?",
                    isTerminal: true,
                  },
                ],
              },
              {
                id: "s4_optA1_2_cant_breathe",
                text: "I feel like I can't breathe properly.",
                aiResponse: "Feeling like you can't breathe properly can be a very alarming physical symptom of anxiety. It's a scary sensation. What thoughts come up for you when you feel that way?",
                isTerminal: false,
                nextPrompt: "What thoughts or fears emerge when you feel like you can't breathe properly?",
                nextOptions: [
                  {
                    id: "s4_optA1_2_1_panic",
                    text: "I worry I'm having a panic attack.",
                    aiResponse: "The fear of having a panic attack can intensify the physical sensations of anxiety. What does that worry feel like, and what do you do when it comes up?",
                    isTerminal: true,
                  },
                  {
                    id: "s4_optA1_2_2_loss_of_control",
                    text: "I feel like I'm losing control.",
                    aiResponse: "A sense of losing control can be incredibly unsettling, especially when it relates to your physical sensations. What does losing control mean to you in those moments?",
                    isTerminal: true,
                  },
                ],
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
            aiResponse: "Finishing a task you've been avoiding can bring such a sense of relief and accomplishment! That's a great step. What was the feeling after finishing it?",
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