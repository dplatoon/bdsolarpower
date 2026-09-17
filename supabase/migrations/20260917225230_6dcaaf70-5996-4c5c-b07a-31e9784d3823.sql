drop policy if exists "Anyone can submit a project quote request" on public.project_quote_requests;

create policy "Anyone can submit a project quote request"
on public.project_quote_requests
for insert
to public
with check (
  status = 'new'
  and char_length(name) between 1 and 200
  and char_length(phone) between 5 and 40
  and (email is null or (char_length(email) <= 320 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
  and (message is null or char_length(message) <= 5000)
  and (company is null or char_length(company) <= 200)
  and (project_name is null or char_length(project_name) <= 200)
);