<h1>EC Process Journals</h1>

<h2>Intro to GIT</h2>

Git is a repository system that allows every member of the team to develop locally and push only when their portion is completed.  It also allows you to experiment and discard without a trace if something goes terribly wrong.

<h2>Special Names</h2>

Story = A story is a small piece of your work that you can complete and merge.  Make stories as small as possible, but make sure the story doesn't leave anything undone or broken at the end of it.

Branch = This is what holds a Story.  It's kind of the same word as Story.

Upstream = This is the main repository where you forked yours from.  This is where all the merges happen and this feeds to everyone else's repositories.

Origin = This is your fork.  This is where you merge changes you made on your local machine and then from here you will merge with Upstream.  This acts kinda like your backup.  If you work on multiple computers, you'd merge here, and then from a different computer, you can pull the files from here and continue working.

Master = This should always be synchronized with Upstream.  This is where all of your branches will be based off of.

Fast-Forward = As you work, other people may update Upstream.  This means that your master will be an older version and your current branch will be based off of that older version.  Now, you will need to synchronize your master with the new Upstream and then "fast forward" your branch to make it like you based it off of the new master.

Pull Request = It is a request you create Github for the other members of your team to look at.  Generally, when a PR is created on Upstream, you don't merge right away, but you should wait until at least one other person on the team has taken a look and given you a go ahead.  Typically, I use the phrase "Ship it!" to notify that it is good to merge.  To merge, just click the Merge button on the PR page.

<h2>Work Flow</h2>

When you first come into work, always start by synchronizing your Master with Upstream:

<pre>
  $ git checkout master
  $ git pull upstream master
</pre>

If you have a branch you are still working on, you need to fast-forward your branch to have the same files as your updated master:

<pre>
  $ git checkout [branch name]
  $ git rebase master
</pre>

If you do not have a branch you are working on, create one:

<pre>
  $ git checkout -b [branch name]
</pre>

Now, you are on a branch that's either newly based off of your synchronized master, or it has been fast-forwarded.  Get to work!

At the end of a story, or end of the day, you need to commit your changes.  To do this, you need to first add or remove any files from git status:

<pre>
  $ git status
</pre>

This will list all the files you have added, modified, or removed.

If you have files you have modified or added, type the following command and then go through the prompt to verify your changes and confirm them one at a time:

<pre>
  $ git add -p
</pre>

If you have files you have removed, type the following to remove each file individually:

<pre>
  $ git rm [file path + name]
</pre>

After you've updated git status, check to make sure everything is green and good to go:

<pre>
  $ git status
</pre>

If not, repeat the above couple steps to add/update or remove any additional files to resolve git status.

If everything is green, go ahead and commit these changes:

<pre>
  $ git commit
</pre>

It should give you a form to fill out.  The editor you are using is probably emacs.  Go ahead and fill out the form, then, to save and exit, press: control + X => control + C => Y => return

With this commit, there is one last thing to do before you push.  When you push this commit and merge, it may cause unpredictable conflicts.  To avoid this, you need to synchronize with master to bring it up-to-date.  Then, you can rebase your branch off of this updated master and resolve any conflicts locally.  This is because resolving the conflicts should be the responsibility of the person who is pushing the changes.

To do so, just repeat the steps you took at the start of your day and then rebase:

<pre>
  $ git checkout master
  $ git pull upstream master
  $ git push origin master
  $ git checkout [branch name]
  $ git rebase master
</pre>

If the rebasing doesn't give you any conflicts, you may skip this step.  However, if it does, just go to the files that have the conflicts and you will see clearly where the conflicts occur.  Resolve them and come back to continue the rebase:

<pre>
  $ git rebase --continue
</pre>

Now, you are ready to push your changes to your origin:

<pre>
  $ git push origin [branch name]
</pre>

If your story is complete, and you'd like to merge your branch with Upstream, you'll first need to create a pull request.  Go to github and to your 'Platform UX' repository page.  There, you should see the branch you just pushed on to origin along side a button that says "Pull Request" (There will also be a "Compare" button next to it).  Press that button and you'll see a page that will let you review the commit message.  Click "Send Pull Request".  Now wait for a ship it and merge!

Once your branch has been merged, you don't need the old branch anymore.  The branch currently exists in two places: local and origin

First, remove from local:
<pre>
  $ git branch -D [branch name]
</pre>

Then, from origin:
<pre>
  $ git push origin :[branch name]
</pre>

<h2>Reference</h2>

To see your current work log
<pre>
  $ glg
</pre>

To see current git status
<pre>
  $ git status
</pre>

To see all of your branches
<pre>
  $ git branch
</pre>

To switch to a different branch
<pre>
  $ git checkout [branch name]
</pre>

To create a new branch
<pre>
  $ git checkout -b [branch name]
</pre>

To delete a branch locally
<pre>
  $ git branch -D [branch name]
</pre>

To delete a branch on origin
<pre>
  $ git push origin :[branch name]
</pre>

To add/update files in git status
<pre>
  $ git add -p
</pre>

To remove files in git status
<pre>
  $ git rm [file path + name]
</pre>

To commit current branch before pushing to origin
<pre>
  $ git commit
</pre>

To sync local master with upstream
<pre>
  $ git pull upstream master
</pre>

<h2>Additional Notes</h2>
  If you do things right, you should be able to see "bubbles" when you type "glg".  This means that every story is isolated to its own change and all conflicts have been resolved without any overlap with other members' work.  To make nicer looking "bubbles", you can squash commits together.  I will upload details on that upon request only after you understand what a bubble is.  You will see a few of my "bubbles" in there already.