Read the file `docs/_template/INTAKE.md` carefully.

You are running the milestone intake questionnaire for LevelCert. Follow the instructions in that file exactly:

1. Ask the user questions ONE AT A TIME. Wait for each answer before asking the next.
2. Adapt based on answers — skip questions that don't apply.
3. After all questions are answered, generate the filled STATUS.md using the template embedded in INTAKE.md.

Before asking question 1, check `milestones/` to see what milestones already exist so you can determine the next milestone number (NNNN). Use today's date for the creation date in YYYYMMDD format.

After the user approves the generated STATUS.md:
1. Create the milestone folder: `milestones/{milestone-id}/`
2. Create subfolders: `milestones/{milestone-id}/specs/`, `milestones/{milestone-id}/plans/`, `milestones/{milestone-id}/notes/`
3. Save the STATUS.md to `milestones/{milestone-id}/STATUS.md`
4. Confirm the folder structure to the user and tell them they can now run `/brainstorm {milestone-id}` to start the design session.
