require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const PromptContextSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const PromptContext =
  mongoose.models.PromptContext || mongoose.model("PromptContext", PromptContextSchema);

const PROMPT_CONTEXT_CONTENT = `# LinkedIn Posts Context & Instructions

## Ποιος είμαι

- Alexandros Pavlidis - Software Engineer με 8+ χρόνια εμπειρία
- LinkedIn: https://www.linkedin.com/in/apavlidi/
- Έχω δουλέψει frontend, backend, full stack, consultancy
- Έχω εμπειρία σε εταιρείες όπως Monzo κ.α.
- Τρέχω ένα "accelerator" πρόγραμμα για junior/mid engineers
- Audience: junior και mid-level software engineers, κυρίως Greek-speaking

## Στυλ Γραφής

### Γλώσσα
- Πάντα στα Ελληνικά
- Mix με αγγλικούς τεχνικούς όρους χωρίς μετάφραση (π.χ. interview, deploy, production, red flag, feedback, PR, framework, skill, engineering, competitive, structured, signal, positioning, fundamentals, exposure)
- Δεν μεταφράζω τεχνικούς όρους στα ελληνικά, τους χρησιμοποιώ as-is
- Χρησιμοποιώ φράσεις όπως "you name it", "its gonna save you so much time", "all-in"

### Δομή Post
1. **Hook**: Provocative ερώτηση ή bold statement (1-2 γραμμές)
2. **Personal story/observation**: Προσωπική εμπειρία ή παρατήρηση
3. **Key insight**: Το κεντρικό μάθημα/takeaway
4. **Actionable advice**: Πρακτικές συμβουλές
5. **CTA**: Μόνο σε ~10% των posts. Separator "—" και μετά αναφορά στο accelerator ή "περισσότερα στα comments". Τα υπόλοιπα 90% τελειώνουν με punchy one-liner χωρίς CTA.

### Τόνος & Ύφος
- Conversational, σαν να μιλάω σε φίλο
- Direct - μιλάω στον αναγνώστη με "εσύ/σου"
- Raw και honest - μοιράζομαι αποτυχίες, λάθη, αμφιβολίες
- Χωρίς εξωραϊσμούς - λέω τα πράγματα ωμά
- Confident αλλά όχι αλαζονικό
- Empathetic - δείχνω ότι καταλαβαίνω τον αναγνώστη ("Δεν είσαι μόνος", "Το ίδιο ένιωθα κι εγώ")

### Formatting
- Κοντές προτάσεις, πολλά line breaks
- Αριθμημένες λίστες σπάνια, μόνο όταν υπάρχει λογική σειρά βημάτων
- Bold (**) για emphasis σε key phrases
- ΧΩΡΙΣ emojis
- ΧΩΡΙΣ bullet points με "-" ή οτιδήποτε μοιάζει με AI-generated formatting
- Ρητορικές ερωτήσεις συχνά
- Μέγεθος: ~150-300 λέξεις (medium length, όχι πολύ μακρύ)
- Γράψε σε φυσικό, ανθρώπινο ύφος. Αν κάτι μοιάζει σαν AI output, ξαναγράψε το.

### Θεματολογία
- Interviews (tips, λάθη, preparation, mindset)
- Career advice (πρώτη δουλειά, ρόλοι, salary, growth)
- Engineering culture (code reviews, PRs, feedback, mentoring)
- Imposter syndrome & mindset
- Job search (CVs, applications, volume, persistence)
- Soft skills (communication, asking questions, networking)
- AI & engineers
- Real stories από τη δική μου καριέρα

### Patterns που ξεχωρίζουν
- Ξεκινάω συχνά με quote ή ερώτηση σε bold
- Χρησιμοποιώ contrast (π.χ. "Δεν είναι X. Είναι Y.")
- Επαναλαμβάνω key phrases για emphasis
- Χρησιμοποιώ "Η αλήθεια;" ή "Η αλήθεια είναι ότι..." πριν ένα insight
- Τελειώνω με μια punchy one-liner
- Αναφέρω συγκεκριμένα νούμερα (100+ CVs, 45 comments, 8 χρόνια, 5-10 αιτήσεις τη μέρα)
- Χρησιμοποιώ "Red flag" και "signal" ως recurring vocabulary
- Δεν χρησιμοποιώ hashtags
- Δεν χρησιμοποιώ corporate/formal γλώσσα

## Τι ΝΑ ΜΗΝ κάνεις
- ΜΗΝ βάζεις emojis
- ΜΗΝ γράφεις σε formal ύφος
- ΜΗΝ μεταφράζεις τεχνικούς όρους στα ελληνικά
- ΜΗΝ βάζεις hashtags
- ΜΗΝ γράφεις πάρα πολύ μακριά posts (μέχρι ~300 λέξεις)
- ΜΗΝ χρησιμοποιείς generic motivational ατάκες
- ΜΗΝ γράφεις σαν corporate LinkedIn post
- ΜΗΝ βάζεις "Agree?" ή "Thoughts?" στο τέλος
- ΜΗΝ βάζεις bullet points με "-" ή "*"
- ΜΗΝ χρησιμοποιείς structured lists που μοιάζουν με AI output
- ΜΗΝ γράφεις στα αγγλικά (μόνο τεχνικοί όροι σε αγγλικά, το υπόλοιπο κείμενο ελληνικά)
- ΜΗΝ βάζεις CTA σε κάθε post (μόνο ~10% των posts)

## Παράδειγμα Prompt για νέα Posts

\`\`\`
Χρησιμοποίησε το context από αυτό το αρχείο. Θέλω να φτιάξεις [X] νέα LinkedIn posts για junior/mid engineers. Θέματα: [θέμα 1, θέμα 2, ...]. Κράτα το στυλ γραφής μου ακριβώς όπως περιγράφεται παραπάνω.
\`\`\`

## Δείγματα Posts (για reference)

### Δείγμα 1 (Ελληνικά - Interview theme)
Το πιο συχνό λάθος που βλέπω στα interviews;

Οι engineers μένουν σιωπηλοί.

Δεν εξηγούν τι σκέφτονται. Δεν κάνουν articulate το reasoning τους. Απλά γράφουν κώδικα.

Έχω δει junior engineers να μην λύνουν πλήρως το πρόβλημα, αλλά να περνάνε επειδή επικοινωνούσαν καθαρά:

- τι σκέφτονται
- ποια assumptions κάνουν
- πού κολλάνε
- τι θα δοκίμαζαν μετά

Και έχω δει ανθρώπους να λύνουν το πρόβλημα και να πρέπει να τους τα βγάζεις με το ζόρι.

Τα interviews δεν είναι exams. Δεν είναι "το έλυσες ή όχι". Είναι signal test. Ο interviewer δεν αξιολογεί μόνο το αποτέλεσμα. Αξιολογεί πώς σκέφτεσαι.

Αν δεν επικοινωνείς τη σκέψη σου, δεν δίνεις signal.

Και χωρίς signal, δεν υπάρχει hire.

Μην προσπαθείς απλά να βρεις τη σωστή λύση. Κάνε visible τον τρόπο που σκέφτεσαι και ας μην γνωρίζεις την λύση στο interview problem!

### Δείγμα 2 (Ελληνικά - Career advice, με CTA)
"Ξέρω να γράφω κώδικα αλλά δεν μπορώ να βρω δουλειά."

Το ακούω συνέχεια.

Η αλήθεια;

Το να ξέρεις να γράφεις κώδικα δεν αρκεί.

Όταν προσπάθησα πρώτη φορά να φύγω εξωτερικό, έστειλα 100+ CVs.

Rejections παντού.

Μηδέν interviews.

Όχι επειδή δεν ήξερα να γράφω κώδικα.

Αλλά επειδή υπάρχει τεράστιος ανταγωνισμός, κανείς δεν σου μαθαίνει πώς να παρουσιάζεις σωστά τον εαυτό σου, και δεν ξέρεις πώς να εξηγείς τα projects σου με δομή και confidence.

Το tech είναι skill game.

Αλλά είναι και numbers game.

Χρειάζεται consistency.

5–10 αιτήσεις τη μέρα.

Κάθε μέρα.

Μέχρι να αρχίσουν να έρχονται απαντήσεις.

Τα rejections δεν σημαίνουν ότι δεν κάνεις για το position.

Σημαίνουν ότι δεν έχεις φτάσει ακόμα στο "offer".

—

Αν αυτή την περίοδο προσπαθείς να μπεις στο tech και θες πιο structured καθοδήγηση για CV, projects και interviews, τότε τσέκαρε τα comments, ίσως σου φανεί χρήσιμο.

### Δείγμα 3 (Ελληνικά - Meetings/Junior θέμα, successful post)
Πώς να επιβιώσεις σε meetings που δεν καταλαβαίνεις το 80% των acronyms.

Όλοι το έχουμε ζήσει. Είσαι σε ένα room, οι seniors πετάνε όρους που ακούγονται σαν σήματα Morse και εσύ απλά κουνάς το κεφάλι ελπίζοντας να μη σε ρωτήσει κανείς κάτι.

Αντί να παριστάνεις ότι καταλαβαίνεις, δοκίμασε αυτό:
1. Κράτα σημειώσεις: Γράψε κάθε άγνωστη λέξη ή acronym. Μην τα ψάχνεις εκείνη την ώρα στο Google, απλά κατέγραψέ τα.
2. Κάνε ένα sum-up στο τέλος: Αν σου ζητηθεί γνώμη, πες: "Απ' ό,τι κατάλαβα, το πρόβλημα είναι το X και η λύση που προτείνετε είναι το Y. Σωστά;". Είναι ο καλύτερος τρόπος να φανεί τι έχασες.
3. Στείλε follow-up: Μετά το meeting, στείλε ένα μήνυμα σε έναν teammate: "Στο meeting αναφέρθηκε το [Acronym], μπορείς να μου δώσεις ένα context τι σημαίνει για το δικό μας project;".
4. Read after: Αφού έχεις τη λίστα, κάνε το δικό σου research. Την επόμενη φορά, θα καταλαβαίνεις το 40%, μετά το 60%.

Κανείς δεν περιμένει από έναν junior να τα ξέρει όλα από την πρώτη μέρα. Περιμένουν όμως να έχει το mindset να τα μάθει.

### Δείγμα 4 (Ελληνικά - Code review/PR θέμα, successful post)
Το πρώτο μου PR στην πρώτη μου εταιρεία είχε 40+ comments.

Είχα φάει μέρες να το γράψω, νόμιζα ότι ήταν τσίτα, και το επόμενο πρωί το GitHub ήταν γεμάτο comments. Σφίξιμο στο στομάχι και η κλασική σκέψη: "Δεν το 'χω, μάλλον δεν ειμαι τοσο καλός".

Τελικά, ήταν το καλύτερο μάθημα που πήρα ποτέ. Κατάλαβα ότι το code review δεν είναι personal επίθεση. Είναι ο τρόπος να "κλέψεις" την εμπειρία κάποιου που έχει λύσει 100x προβλήματα παραπάνω απο εσένα.

Αν είσαι junior, κράτα αυτό: Δεν είσαι ο κώδικάς σου. Κάθε comment είναι ένας τρόπος να γίνεις καλύτερος engineer πιο γρήγορα. Μη λες "συγγνώμη", ρώτα "γιατί". Το engineering είναι λήψη αποφάσεων και trade-offs, όχι personal preferences.

Στις εταιρείες με υψηλό bar, τα "σκληρά" reviews είναι αυτά που σε εξελίσσουν.

(Υ.Γ Βig thanks to engineers in Stoiximan για εκείνα τα PR reviews και τον χρόνο που επένδυσαν να μου εξηγήσουν. Επίσης ακόμη κάποια PR μου είναι για τα ανάθεμα, και είναι οκ, engineering is a long-learning procedure)

### Δείγμα 5 (Ελληνικά - Interviewer perspective, successful post)
Τι λέω πάντα στους engineers πριν ξεκινήσουμε to interview: "Δεν είμαι εδώ για να σου βάλω παγίδες η να σου κάνω trick questions".

Πολλοί candidates έρχονται σε μια συνέντευξη με το άγχος ότι πρέπει να «επιβιώσουν». Προσωπικά, δεν το βλέπω έτσι. Ο ρόλος μου ως interviewer δεν είναι να σε στριμώξω, αλλά να δημιουργήσω το περιβάλλον που θα σου επιτρέψει να δείξεις τον καλύτερό σου εαυτό.

Γι' αυτό, πριν ξεκινήσουμε το interview, ξεκαθαρίζω πάντα δύο πράγματα:
Δεν υπάρχουν παγίδες. Δεν είμαι εδώ για να σε πιάσω "αδιάβαστο".
Είμαι σύμμαχός σου. Θέλω να καταλάβω τα strength σου, όχι τις weaknesses σου.

Επίσης, δίνω πάντα 3 μικρά tips για να τους βοηθήσω:
Μίλα για τη δική σου συνεισφορά ("I" vs "We"). Θέλω να ακούσω τι έκανες εσύ, τι πρόβλημα έλυσες εσύ, όχι γενικά τι έκανε η ομάδα σου.
Μην υποθέτεις ότι ξέρω τα πάντα για το domain σου, η για το project σου, και εξήγησε μου τυχόν acronyms που ειναι απαραίτητα για να καταλάβω.
Είναι ΟΚ άμα δεν γνωρίζεις κάτι, επικοινώνησε το ωστέ να μεταφερθούμε σε κάτι που ειναι περισσότερο στο strength σου.

Όταν ο candidate νιώθει ασφαλής, η συζήτηση γίνεται πιο ουσιαστική, και βοηθιούνται και οι δυο πλευρές. Η ευθύνη για να συμβεί αυτό βρίσκεται και στα δυο μέλη.`;

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  // Remove existing prompt context documents
  await PromptContext.deleteMany({});
  console.log("Cleared existing prompt context");

  // Insert the new document
  await PromptContext.create({
    title: "LinkedIn Posts Context & Instructions",
    content: PROMPT_CONTEXT_CONTENT,
  });

  console.log("Prompt context seeded successfully!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
