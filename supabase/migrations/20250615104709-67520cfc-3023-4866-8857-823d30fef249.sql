
-- Create user_questionnaires table to store questionnaire responses
CREATE TABLE public.user_questionnaires (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  website_type TEXT NOT NULL,
  primary_goal TEXT NOT NULL,
  budget TEXT NOT NULL,
  skill_level TEXT NOT NULL,
  timeline TEXT NOT NULL,
  responses JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on user_questionnaires
ALTER TABLE public.user_questionnaires ENABLE ROW LEVEL SECURITY;

-- Create policies for user_questionnaires
CREATE POLICY "Users can view their own questionnaires" 
  ON public.user_questionnaires 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own questionnaires" 
  ON public.user_questionnaires 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own questionnaires" 
  ON public.user_questionnaires 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create trigger to update updated_at column
CREATE OR REPLACE TRIGGER update_user_questionnaires_updated_at
  BEFORE UPDATE ON public.user_questionnaires
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
