document.addEventListener('DOMContentLoaded', () => {
    // --- MOCK DATA STORE ---
    // All dynamic content is now stored here using translation keys
    const mockData = {
        scanFindings: [
            { titleKey: 'finding_tls_title', statusOkThreshold: 80, detailsKey: 'finding_tls_details', recommendationKey: 'finding_tls_rec' },
            { titleKey: 'finding_email_auth_title', statusOkThreshold: 65, detailsKey: 'finding_email_auth_details', recommendationKey: 'finding_email_auth_rec' },
            { titleKey: 'finding_headers_title', status: 'warn', detailsKey: 'finding_headers_details', recommendationKey: 'finding_headers_rec' },
        ],
        checklist: [
            { sectionKey: "checklist_section1_title", questions: [{ id: 'q1', textKey: 'checklist_q1_text'}, {id: 'q2', textKey: 'checklist_q2_text'}] },
            { sectionKey: "checklist_section2_title", questions: [{ id: 'q3', textKey: 'checklist_q3_text'}, { id: 'q4', textKey: 'checklist_q4_text'}] },
            { sectionKey: "checklist_section3_title", questions: [{ id: 'q5', textKey: 'checklist_q5_text'}] }
        ],
        experts: [
            { name: 'SecureIT Solutions', specKey: 'spec_web_sec', rating: 4.8 }, { name: 'DataProtect SRL', specKey: 'spec_backup', rating: 4.9 },
            { name: 'InfraGuard', specKey: 'spec_net_sec', rating: 4.7 }, { name: 'MailFortress', specKey: 'spec_email_sec', rating: 5.0 },
        ],
        industries: [
            { key: 'industry_retail', name: 'Retail' }, { key: 'industry_it', name: 'IT' }, 
            { key: 'industry_agri', name: 'Agricultură' }, { key: 'industry_const', name: 'Construcții' }
        ],
        vendors: [
            { name: 'Contabilitate SRL', status: 'green' }, { name: 'IT Service Grup', status: 'green' },
            { name: 'Marketing Agency', status: 'yellow' }, { name: 'Courier Service', status: 'red' }
        ],
        alerts: [
            { titleKey: 'alert1_title', dateKey: 'alert_date_2h' },
            { titleKey: 'alert2_title', dateKey: 'alert_date_1d' },
        ],
        trainingQuestions: [
            { questionKey: 'training_q1', optionsKeys: ['training_q1_opt1', 'training_q1_opt2', 'training_q1_opt3'], correct: 1 },
            { questionKey: 'training_q2', optionsKeys: ['training_q2_opt1', 'training_q2_opt2', 'training_q2_opt3'], correct: 1 },
        ],
        employees: [
            { name: 'Ion Popescu', status: 'completed', date: '2025-08-15' },
            { name: 'Maria Ionescu', status: 'pending', date: '-' }
        ],
        policies: [
            { titleKey: 'policy_pass_title', icon: 'fa-key' },
            { titleKey: 'policy_net_title', icon: 'fa-wifi' },
            { titleKey: 'policy_incident_title', icon: 'fa-file-medical' }
        ],
        drillSteps: [
            { titleKey: 'drill_step1_title', questionKey: 'drill_step1_q', optionsKeys: ['drill_step1_opt1', 'drill_step1_opt2'] },
            { titleKey: 'drill_step2_title', questionKey: 'drill_step2_q', inputPlaceholderKey: 'drill_step2_placeholder' }
        ]
    };

    // --- DICTIONARIES AND TRANSLATIONS (Expanded) ---
    const translations = {
        ro: {
            // Navigation & Titles
            nav_dashboard: "Panou de control", nav_checklist: "Listă Conformitate", nav_reporting: "Raportare Incident", nav_killer_features: "Funcționalități Cheie",
            nav_marketplace: "Piața Cyber-Help", nav_risk_calculator: "Calculator de Risc", nav_vendor_chain: "Lanț de Încredere", nav_industry_shield: "Scut de Industrie",
            nav_training: "Cyber-Antrenament", nav_proactive_defense: "Apărare Proactivă", nav_onboarding: "Integrare Angajați", nav_policy_generator: "Generator Politici",
            nav_incident_drill: "Simulare Incident",

            // Dashboard & Findings
            dashboard_title: "Panou de control Igienă Cibernetică", dashboard_subtitle: "Introduceți domeniul sau IP-ul pentru a efectua un audit de bază.", dashboard_scan_button: "Pornește Scanarea",
            scan_results_for: "Rezultate Audit pentru", compliance_score: "Scor de Conformitate", key_findings: "Constatări Cheie", scan_in_progress: "Scanare în desfășurare...",
            passport_button: "Descarcă Pașaport", passport_title: "Pașaport de Conformitate", passport_desc: "Acesta este un model al raportului PDF care va fi generat.",
            dynamics_title: "Dinamica Îmbunătățirilor", status_good: "Bun", status_medium: "Mediu", status_weak: "Slab",
            finding_recommendation: "Recomandare", find_expert_button: "Găsește Expert",
            finding_tls_title: "Politici TLS/SSL", finding_tls_details: "TLS 1.2 & 1.3 activate. Certificat valid.", finding_tls_rec: "Dezactivați versiunile vechi de TLS (1.0, 1.1).",
            finding_email_auth_title: "Autentificare E-mail (SPF, DKIM)", finding_email_auth_details: "Înregistrare SPF găsită. Înregistrarea DKIM lipsește.", finding_email_auth_rec: "Configurați DKIM pentru a preveni spoofing-ul.",
            finding_headers_title: "Antete de Securitate Web", finding_headers_details: "Lipsește Content-Security-Policy.", finding_headers_rec: "Implementați un antet CSP strict.",
            
            // Checklist
            checklist_title: "Listă de Conformitate (Art. 11)", checklist_subtitle: "Completați acest chestionar pentru a evalua nivelul de conformitate.",
            checklist_progress: "Progres Conformitate",
            checklist_section1_title: "Controlul Accesului", checklist_q1_text: 'Este autentificarea multi-factor (MFA) obligatorie pentru conturile administrative?', checklist_q2_text: 'Parolele sunt complexe și se rotesc periodic?',
            checklist_section2_title: "Backup și Recuperare", checklist_q3_text: 'Există un plan de backup pentru datele critice?', checklist_q4_text: 'A fost efectuat un test de restaurare în ultimele 6 luni?',
            checklist_section3_title: "Logging și Monitorizare", checklist_q5_text: 'Evenimentele de securitate sunt centralizate și monitorizate?',

            // Reporting
            reporting_title: "Raportare Incident (Art. 12)", reporting_subtitle: "Utilizați acest formular pentru a notifica autoritățile.",
            initial_report: "Notificare Inițială", update_report: "Actualizare", final_report: "Raport Final",
            report_details_for: "Detalii pentru", report_submit: "Trimite Raport",
            smart_reporter_title: "Reporter Inteligent (AI)", smart_reporter_desc: "Descrieți incidentul în cuvinte simple. AI-ul va ajuta.",
            get_ai_help: "Obține Ajutor AI", ai_suggestion: "Sugestie AI", incident_placeholder: "ex: Site-ul nostru a fost spart...",
            ai_suggestion_text: "S-a detectat un incident de tip 'Web Defacement'. Se recomandă izolarea serverului și analiza log-urilor.",
            
            // Marketplace
            marketplace_title: "Piața Cyber-Help", marketplace_subtitle: "Găsiți experți locali verificați.", contact_expert: "Contactează Expertul",
            spec_web_sec: "Securitate Web", spec_backup: "Backup & Recuperare", spec_net_sec: "Securitate Rețea", spec_email_sec: "Securitate Email",

            // Risk Calculator
            risk_calculator_title: "Calculator de Risc", risk_calculator_subtitle: "Transformați riscurile în estimări financiare.",
            calculate_risk: "Calculează Riscul", potential_loss: "Pierdere Potențială Anuală Estimată", insurance_readiness: "Index de Pregătire pentru Asigurare",
            industry: "Industrie", employees: "Nr. Angajați", turnover: "Cifra de afaceri (MDL)",
            industry_retail: "Retail", industry_it: "IT", industry_agri: "Agricultură", industry_const: "Construcții",
            
            // Vendor Chain
            vendor_chain_title: "Lanțul de Încredere", vendor_chain_subtitle: "Gestionați riscurile provenite de la parteneri.",
            invite_vendor: "Invită Furnizor", vendor_name: "Nume Furnizor", vendor_status: "Status",
            status_green: "Conform", status_yellow: "Necesită Atenție", status_red: "Risc Ridicat",

            // Industry Shield
            industry_shield_title: "Scutul Industriei", industry_subtitle: "Primiți alerte specifice industriei dvs.",
            recent_alerts: "Alerte Recente", alert1_title: "Atac Phishing nou detectat în sectorul Agricol", alert2_title: "Vulnerabilitate critică în software-ul de contabilitate X",
            alert_date_2h: "Acum 2 ore", alert_date_1d: "Acum 1 zi",

            // Training
            training_title: "Antrenament Cibernetic", training_subtitle: "Testează-ți cunoștințele. Este phishing sau nu?",
            submit_answer: "Trimite Răspuns", correct_answer: "Corect!", wrong_answer: "Greșit!", next_question: "Următoarea Întrebare",
            training_q1: "Ați primit un email de la 'banca-moldova@info.com' care vă cere să vă confirmați parola. Ce faceți?",
            training_q1_opt1: "Introduc parola", training_q1_opt2: "Șterg email-ul și îl raportez", training_q1_opt3: "Sun la bancă să verific",
            training_q2: "Un pop-up apare și spune 'Ați câștigat un iPhone! Click aici!'. Ce faceți?",
            training_q2_opt1: "Click pentru a revendica", training_q2_opt2: "Închid fereastra pop-up", training_q2_opt3: "Introduc datele mele",

            // Onboarding
            onboarding_title: "Integrarea Angajaților", onboarding_subtitle: "Asigurați-vă că fiecare nou membru primește instrucțiuni de bază.",
            onboarding_invite: "Invită Angajat", onboarding_employee: "Angajat", onboarding_status: "Status", onboarding_date: "Data finalizării",
            onboarding_status_completed: "Finalizat", onboarding_status_pending: "În așteptare",

            // Policy Generator
            policy_generator_title: "Generator de Politici", policy_generator_subtitle: "Creați documente de securitate pentru compania dvs.",
            policy_generate_button: "Generează", policy_pass_title: "Politica de Parole", policy_net_title: "Politica de Utilizare a Internetului", policy_incident_title: "Plan de Răspuns la Incident",

            // Incident Drill
            incident_drill_title: "Simulare de Incident", incident_drill_subtitle: "Testați pregătirea echipei dvs. printr-un exercițiu simulat.",
            incident_drill_start_button: "Începe Simularea", incident_drill_step: "Pasul", incident_drill_finish_button: "Finalizează",
            incident_drill_results_title: "Rezultatele Simulării",
            drill_step1_title: "Detecție", drill_step1_q: "Ați primit un email suspect. Ce faceți mai întâi?",
            drill_step1_opt1: "Izolez mașina și raportez", drill_step1_opt2: "Șterg email-ul",
            drill_step2_title: "Raportare", drill_step2_q: "Ați izolat problema. Unde raportați incidentul intern?",
            drill_step2_placeholder: "Numele persoanei/departamentului",
            drill_continue_button: "Continuă",
            drill_results_text: "Simulare finalizată. Timp de răspuns: 5 minute. Puncte de îmbunătățit: Clarificarea contactului intern.",
            drill_rerun_button: "Rulează din nou",
        },
        ru: {
            // Navigation & Titles
            nav_dashboard: "Панель управления", nav_checklist: "Чек-лист", nav_reporting: "Сообщить", nav_killer_features: "Ключевые функции",
            nav_marketplace: "Биржа Cyber-Помощи", nav_risk_calculator: "Калькулятор рисков", nav_vendor_chain: "Цепочка доверия", nav_industry_shield: "Отраслевой щит", nav_training: "Тренировка",
            nav_proactive_defense: "Проактивная защита", nav_onboarding: "Инструктаж", nav_policy_generator: "Генератор политик", nav_incident_drill: "Симулятор инцидента",
            
            // Dashboard
            dashboard_title: "Панель кибергигиены", dashboard_subtitle: "Введите домен или IP для аудита.", dashboard_scan_button: "Сканировать",
            scan_results_for: "Результаты для", compliance_score: "Оценка", key_findings: "Ключевые выводы", scan_in_progress: "Сканирование...",
            passport_button: "Скачать Паспорт", passport_title: "Паспорт Соответствия", passport_desc: "Это макет PDF-отчета.",
            dynamics_title: "Динамика улучшений", status_good: "Хорошо", status_medium: "Средне", status_weak: "Слабо",
            finding_recommendation: "Рекомендация", find_expert_button: "Найти эксперта",
            finding_tls_title: "Политики TLS/SSL", finding_tls_details: "TLS 1.2 и 1.3 активны. Сертификат действителен.", finding_tls_rec: "Отключите устаревшие версии TLS (1.0, 1.1).",
            finding_email_auth_title: "Аутентификация почты (SPF, DKIM)", finding_email_auth_details: "Найдена SPF-запись. DKIM-запись отсутствует.", finding_email_auth_rec: "Настройте DKIM для предотвращения спуфинга.",
            finding_headers_title: "Заголовки безопасности", finding_headers_details: "Отсутствует Content-Security-Policy.", finding_headers_rec: "Внедрите строгий заголовок CSP.",
            
            // Checklist
            checklist_title: "Чек-лист (Ст. 11)", checklist_subtitle: "Заполните опросник для оценки соответствия.", checklist_progress: "Прогресс",
            checklist_section1_title: "Контроль доступа", checklist_q1_text: 'Обязательна ли многофакторная аутентификация (MFA) для административных учетных записей?', checklist_q2_text: 'Пароли сложные и периодически меняются?',
            checklist_section2_title: "Резервное копирование и восстановление", checklist_q3_text: 'Существует ли план резервного копирования критически важных данных?', checklist_q4_text: 'Проводился ли тест восстановления за последние 6 месяцев?',
            checklist_section3_title: "Логирование и мониторинг", checklist_q5_text: 'События безопасности централизованы и отслеживаются?',

            // Reporting
            reporting_title: "Отчет об инциденте (Ст. 12)", reporting_subtitle: "Используйте эту форму для уведомления властей.",
            initial_report: "Первичное", update_report: "Обновление", final_report: "Финальное",
            report_details_for: "Детали для", report_submit: "Отправить отчет",
            smart_reporter_title: "Умный репортер (ИИ)", smart_reporter_desc: "Опишите инцидент своими словами.", get_ai_help: "Помощь ИИ", ai_suggestion: "AI-предложение",
            incident_placeholder: "пример: Наш сайт взломали...",
            ai_suggestion_text: "Обнаружен инцидент типа 'Web Defacement'. Рекомендуется изолировать сервер и проанализировать логи.",

            // Marketplace
            marketplace_title: "Биржа Cyber-Помощи", marketplace_subtitle: "Найдите местных экспертов.", contact_expert: "Связаться",
            spec_web_sec: "Веб-безопасность", spec_backup: "Бэкап и восстановление", spec_net_sec: "Сетевая безопасность", spec_email_sec: "Безопасность почты",

            // Risk Calculator
            risk_calculator_title: "Калькулятор рисков", risk_calculator_subtitle: "Преобразуйте риски в финансовые оценки.",
            calculate_risk: "Рассчитать", potential_loss: "Потенциальный годовой убыток", insurance_readiness: "Готовность к страхованию",
            industry: "Отрасль", employees: "Кол-во сотрудников", turnover: "Оборот (MDL)",
            industry_retail: "Торговля", industry_it: "IT", industry_agri: "Сельское хозяйство", industry_const: "Строительство",

            // Vendor Chain
            vendor_chain_title: "Цепочка доверия поставщиков", vendor_chain_subtitle: "Управляйте рисками от партнеров.",
            invite_vendor: "Пригласить", vendor_name: "Имя поставщика", vendor_status: "Статус",
            status_green: "Соответствует", status_yellow: "Требует внимания", status_red: "Высокий риск",

            // Industry Shield
            industry_shield_title: "Отраслевой щит", industry_subtitle: "Получайте оповещения для вашей отрасли.",
            recent_alerts: "Последние оповещения", alert1_title: "Обнаружена новая фишинг-атака в агросекторе", alert2_title: "Критическая уязвимость в ПО для бухгалтерии X",
            alert_date_2h: "2 часа назад", alert_date_1d: "1 день назад",

            // Training
            training_title: "Еженедельная тренировка", training_subtitle: "Это фишинг или нет?",
            submit_answer: "Ответить", correct_answer: "Правильно!", wrong_answer: "Неправильно!", next_question: "Следующий вопрос",
            training_q1: "Вы получили письмо от 'banca-moldova@info.com' с просьбой подтвердить пароль. Ваши действия?",
            training_q1_opt1: "Ввожу пароль", training_q1_opt2: "Удаляю письмо и сообщаю", training_q1_opt3: "Звоню в банк для проверки",
            training_q2: "Появилось окно 'Вы выиграли iPhone! Жмите здесь!'. Ваши действия?",
            training_q2_opt1: "Жму, чтобы забрать", training_q2_opt2: "Закрываю окно", training_q2_opt3: "Ввожу свои данные",
            
            // Onboarding
            onboarding_title: "Инструктаж новых сотрудников", onboarding_subtitle: "Убедитесь, что каждый новый член команды прошел инструктаж.",
            onboarding_invite: "Пригласить сотрудника", onboarding_employee: "Сотрудник", onboarding_status: "Статус", onboarding_date: "Дата завершения",
            onboarding_status_completed: "Завершено", onboarding_status_pending: "Ожидание",

            // Policy Generator
            policy_generator_title: "Генератор политик", policy_generator_subtitle: "Создайте базовые документы безопасности.",
            policy_generate_button: "Сгенерировать", policy_pass_title: "Политика паролей", policy_net_title: "Политика использования интернета", policy_incident_title: "План реагирования на инциденты",

            // Incident Drill
            incident_drill_title: "Симулятор инцидента", incident_drill_subtitle: "Проверьте готовность вашей команды.",
            incident_drill_start_button: "Начать симуляцию", incident_drill_step: "Шаг", incident_drill_finish_button: "Завершить",
            incident_drill_results_title: "Результаты симуляции",
            drill_step1_title: "Обнаружение", drill_step1_q: "Вы получили подозрительное письмо. Что вы сделаете в первую очередь?",
            drill_step1_opt1: "Изолирую компьютер и сообщу", drill_step1_opt2: "Удалю письмо",
            drill_step2_title: "Сообщение", drill_step2_q: "Вы изолировали проблему. Кому вы сообщите об инциденте внутри компании?",
            drill_step2_placeholder: "Имя сотрудника/отдела",
            drill_continue_button: "Продолжить",
            drill_results_text: "Симуляция завершена. Время реакции: 5 минут. Что улучшить: Уточнить внутренние контакты.",
            drill_rerun_button: "Повторить симуляцию",
        },
        en: {
            // Navigation & Titles
            nav_dashboard: "Dashboard", nav_checklist: "Checklist", nav_reporting: "Reporting", nav_killer_features: "Killer Features",
            nav_marketplace: "Marketplace", nav_risk_calculator: "Risk Calculator", nav_vendor_chain: "Vendor Chain", nav_industry_shield: "Industry Shield", nav_training: "Training",
            nav_proactive_defense: "Proactive Defense", nav_onboarding: "Employee Onboarding", nav_policy_generator: "Policy Generator", nav_incident_drill: "Incident Drill",

            // Dashboard
            dashboard_title: "Cyber Hygiene Dashboard", dashboard_subtitle: "Enter your domain or IP to perform a basic audit.", dashboard_scan_button: "Start Scan",
            scan_results_for: "Audit Results for", compliance_score: "Compliance Score", key_findings: "Key Findings", scan_in_progress: "Scan in progress...",
            passport_button: "Download Passport", passport_title: "Compliance Passport", passport_desc: "This is a model of the PDF report.",
            dynamics_title: "Improvement Dynamics", status_good: "Good", status_medium: "Medium", status_weak: "Weak",
            finding_recommendation: "Recommendation", find_expert_button: "Find Expert",
            finding_tls_title: "TLS/SSL Policies", finding_tls_details: "TLS 1.2 & 1.3 active. Valid certificate.", finding_tls_rec: "Disable legacy TLS versions (1.0, 1.1).",
            finding_email_auth_title: "Email Authentication (SPF, DKIM)", finding_email_auth_details: "SPF record found. DKIM record missing.", finding_email_auth_rec: "Configure DKIM to prevent spoofing.",
            finding_headers_title: "Web Security Headers", finding_headers_details: "Content-Security-Policy missing.", finding_headers_rec: "Implement a strict CSP header.",

            // Checklist
            checklist_title: "Compliance Checklist (Art. 11)", checklist_subtitle: "Complete this questionnaire to assess compliance.", checklist_progress: "Compliance Progress",
            checklist_section1_title: "Access Control", checklist_q1_text: 'Is multi-factor authentication (MFA) mandatory for administrative accounts?', checklist_q2_text: 'Are passwords complex and rotated periodically?',
            checklist_section2_title: "Backup and Recovery", checklist_q3_text: 'Is there a backup plan for critical data?', checklist_q4_text: 'Has a restoration test been performed in the last 6 months?',
            checklist_section3_title: "Logging and Monitoring", checklist_q5_text: 'Are security events centralized and monitored?',
            
            // Reporting
            reporting_title: "Incident Reporting (Art. 12)", reporting_subtitle: "Use this form to notify the authorities.",
            initial_report: "Initial Notification", update_report: "Update", final_report: "Final Report",
            report_details_for: "Details for", report_submit: "Submit Report",
            smart_reporter_title: "Smart Reporter (AI)", smart_reporter_desc: "Describe the incident in your own words.", get_ai_help: "Get AI Help", ai_suggestion: "AI Suggestion",
            incident_placeholder: "e.g., Our website was hacked...",
            ai_suggestion_text: "A 'Web Defacement' type incident has been detected. It is recommended to isolate the server and analyze the logs.",
            
            // Marketplace
            marketplace_title: "Cyber-Help Marketplace", marketplace_subtitle: "Find verified local experts.", contact_expert: "Contact Expert",
            spec_web_sec: "Web Security", spec_backup: "Backup & Recovery", spec_net_sec: "Network Security", spec_email_sec: "Email Security",
            
            // Risk Calculator
            risk_calculator_title: "Risk Calculator", risk_calculator_subtitle: "Turn abstract risks into financial estimates.",
            calculate_risk: "Calculate Risk", potential_loss: "Estimated Annual Potential Loss", insurance_readiness: "Insurance Readiness Index",
            industry: "Industry", employees: "Employees", turnover: "Turnover (MDL)",
            industry_retail: "Retail", industry_it: "IT", industry_agri: "Agriculture", industry_const: "Construction",
            
            // Vendor Chain
            vendor_chain_title: "Vendor Trust Chain", vendor_chain_subtitle: "Manage risks from your partners.",
            invite_vendor: "Invite Vendor", vendor_name: "Vendor Name", vendor_status: "Status",
            status_green: "Compliant", status_yellow: "Needs Attention", status_red: "High Risk",
            
            // Industry Shield
            industry_shield_title: "Industry Shield", industry_subtitle: "Get industry-specific security alerts.",
            recent_alerts: "Recent Alerts", alert1_title: "New Phishing attack detected in the Agricultural sector", alert2_title: "Critical vulnerability in accounting software X",
            alert_date_2h: "2 hours ago", alert_date_1d: "1 day ago",

            // Training
            training_title: "Weekly Cyber-Training", training_subtitle: "Test your knowledge. Is it phishing or not?",
            submit_answer: "Submit Answer", correct_answer: "Correct!", wrong_answer: "Wrong!", next_question: "Next Question",
            training_q1: "You received an email from 'banca-moldova@info.com' asking you to confirm your password. What do you do?",
            training_q1_opt1: "Enter my password", training_q1_opt2: "Delete the email and report it", training_q1_opt3: "Call the bank to verify",
            training_q2: "A pop-up appears saying 'You've won an iPhone! Click here!'. What do you do?",
            training_q2_opt1: "Click to claim", training_q2_opt2: "Close the pop-up window", training_q2_opt3: "Enter my details",

            // Onboarding
            onboarding_title: "Employee Onboarding", onboarding_subtitle: "Ensure every new team member gets basic training.",
            onboarding_invite: "Invite Employee", onboarding_employee: "Employee", onboarding_status: "Status", onboarding_date: "Completion Date",
            onboarding_status_completed: "Completed", onboarding_status_pending: "Pending",

            // Policy Generator
            policy_generator_title: "Policy Generator", policy_generator_subtitle: "Create basic security documents for your company.",
            policy_generate_button: "Generate", policy_pass_title: "Password Policy", policy_net_title: "Internet Usage Policy", policy_incident_title: "Incident Response Plan",
            
            // Incident Drill
            incident_drill_title: "Incident Drill", incident_drill_subtitle: "Test your team's readiness with a simulation.",
            incident_drill_start_button: "Start Drill", incident_drill_step: "Step", incident_drill_finish_button: "Finish Drill",
            incident_drill_results_title: "Drill Results",
            drill_step1_title: "Detection", drill_step1_q: "You received a suspicious email. What do you do first?",
            drill_step1_opt1: "Isolate the machine and report", drill_step1_opt2: "Delete the email",
            drill_step2_title: "Reporting", drill_step2_q: "You have isolated the problem. Where do you report the incident internally?",
            drill_step2_placeholder: "Name of the person/department",
            drill_continue_button: "Continue",
            drill_results_text: "Drill complete. Response time: 5 minutes. Points to improve: Clarify internal contact.",
            drill_rerun_button: "Rerun Drill",
        }
    };
    
    // --- APP STATE & COMMON VARIABLES ---
    let currentLang = localStorage.getItem('language') || 'ro';
    let complianceChart = null;
    const modal = document.getElementById('modal');
    
    // --- CORE APP LOGIC (Router, Language, Modal) ---

    const setLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.dataset.translate;
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.dataset.translatePlaceholder;
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        document.getElementById('lang-switcher').querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    };

    const router = () => {
        const hash = window.location.hash || '#dashboard';
        const pageId = hash.substring(1);

        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.toggle('active', section.id === pageId);
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.nav === pageId);
        });

        const pageTitleEl = document.getElementById('page-title');
        const titleKey = `nav_${pageId}`;
        pageTitleEl.textContent = (translations[currentLang] && translations[currentLang][titleKey]) || 'CyberCare';
        
        if (typeof pageInitializers[pageId] === 'function') {
            pageInitializers[pageId]();
        }
    };

    const showModal = (titleKey, contentHTML) => {
        modal.querySelector('#modal-title').dataset.translate = titleKey;
        modal.querySelector('#modal-content').innerHTML = contentHTML;
        modal.classList.add('active');
        setLanguage(currentLang);
    };

    const hideModal = () => {
        modal.classList.remove('active');
    };

    // --- PAGE-SPECIFIC LOGIC & INITIALIZERS ---
    
    const pageInitializers = {
        dashboard: () => {
            const startScanBtn = document.getElementById('start-scan-btn');
            if (startScanBtn.dataset.listener) return;
            startScanBtn.dataset.listener = 'true';
            
            startScanBtn.addEventListener('click', () => {
                const scanTargetInput = document.getElementById('scan-target');
                const loader = document.getElementById('loader-container');
                const resultsContainer = document.getElementById('scan-results-container');
                const target = scanTargetInput.value.trim() || 'exemplu.md';
                resultsContainer.innerHTML = '';
                loader.classList.remove('hidden');
                
                setTimeout(() => {
                    loader.classList.add('hidden');
                    displayScanResults(target, generateMockScanResults());
                }, 1500);
            });
        },
        
        checklist: () => {
            const form = document.getElementById('compliance-form');
            if (form.innerHTML.trim() !== '' && form.dataset.initialized) return;
            form.innerHTML = '';
            form.dataset.initialized = 'true';
            
            let totalQuestions = 0;
            mockData.checklist.forEach(sectionData => {
                const sectionEl = document.createElement('div');
                const title = document.createElement('h4');
                title.className = 'text-lg font-semibold mb-3 border-b pb-2';
                title.dataset.translate = sectionData.sectionKey;
                sectionEl.appendChild(title);
                
                sectionData.questions.forEach(q => {
                    totalQuestions++;
                    const questionEl = document.createElement('div');
                    questionEl.className = 'flex items-center justify-between p-3 rounded-md hover:bg-gray-50 transition-colors';
                    questionEl.innerHTML = `<label for="${q.id}" class="text-gray-700 flex-grow cursor-pointer" data-translate="${q.textKey}"></label><input type="checkbox" id="${q.id}" class="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">`;
                    sectionEl.appendChild(questionEl);
                });
                form.appendChild(sectionEl);
            });

            const updateProgress = () => {
                const checkedCount = form.querySelectorAll('input:checked').length;
                const percentage = totalQuestions > 0 ? Math.round((checkedCount / totalQuestions) * 100) : 0;
                document.getElementById('checklist-progress-bar').style.width = `${percentage}%`;
                document.getElementById('checklist-progress-text').textContent = `${percentage}%`;
            };

            form.addEventListener('change', updateProgress);
            updateProgress();
            setLanguage(currentLang);
        },
        
        reporting: () => {
             const stagesContainer = document.getElementById('report-stages');
             if (stagesContainer.innerHTML.trim() !== '' && stagesContainer.dataset.initialized) return;
             stagesContainer.innerHTML = '';
             stagesContainer.dataset.initialized = 'true';

             const stages = ['initial', 'update', 'final'];
             stages.forEach(stage => {
                 const button = document.createElement('button');
                 button.className = 'report-stage-btn py-3 px-1 sm:px-4 font-medium text-sm sm:text-base';
                 button.dataset.stage = stage;
                 button.dataset.translate = `${stage}_report`;
                 stagesContainer.appendChild(button);
             });

             const switchStage = (stage) => {
                stagesContainer.querySelectorAll('button').forEach(btn => btn.classList.toggle('active', btn.dataset.stage === stage));
                const form = document.getElementById('incident-report-form');
                const stageText = (translations[currentLang] && translations[currentLang][`${stage}_report`]) || stage;
                form.innerHTML = `<div class="space-y-4">
                        <div>
                            <label class="font-medium">${(translations[currentLang].report_details_for || 'Details for')} ${stageText}</label>
                            <textarea class="input-field mt-1" rows="5"></textarea>
                        </div>
                        <button class="btn btn-primary" data-translate="report_submit"></button>
                    </div>`;
                setLanguage(currentLang);
             };

             stagesContainer.addEventListener('click', e => { if (e.target.dataset.stage) switchStage(e.target.dataset.stage) });

             const aiHelperBtn = document.getElementById('ai-helper-btn');
             if(!aiHelperBtn.dataset.listener){
                 aiHelperBtn.dataset.listener = 'true';
                 aiHelperBtn.addEventListener('click', () => {
                    const suggestionBox = document.getElementById('ai-suggestion-box');
                    const userInput = document.getElementById('ai-helper-input').value;
                    if(userInput.trim() === '') return;
                    suggestionBox.classList.remove('hidden');
                    suggestionBox.querySelector('p').dataset.translate = 'ai_suggestion_text';
                    setLanguage(currentLang);
                 });
             }

             switchStage('initial');
        },

        marketplace: () => {
            const grid = document.getElementById('marketplace-grid');
            if(grid.innerHTML.trim() !== '' && grid.dataset.initialized) return;
            grid.innerHTML = '';
            grid.dataset.initialized = 'true';

            mockData.experts.forEach(expert => {
                const card = document.createElement('div');
                card.className = 'feature-card';
                card.innerHTML = `
                    <h3 class="font-bold text-xl">${expert.name}</h3>
                    <p class="text-gray-500" data-translate="${expert.specKey}"></p>
                    <div class="flex items-center gap-1 text-yellow-500 my-2"><i class="fa-solid fa-star"></i> ${expert.rating}</div>
                    <button class="btn btn-primary w-full mt-3" data-translate="contact_expert"></button>
                `;
                grid.appendChild(card);
            });
            setLanguage(currentLang);
        },

        risk_calculator: () => {
             const form = document.getElementById('risk-form');
             if(form.dataset.listener) return;
             form.dataset.listener = 'true';

             const industrySelect = document.getElementById('industry-select');
             if (industrySelect.options.length === 0) {
                 mockData.industries.forEach(ind => {
                     const option = document.createElement('option');
                     option.value = ind.name;
                     option.dataset.translate = ind.key;
                     industrySelect.appendChild(option);
                 });
             }

             form.addEventListener('submit', (e) => {
                 e.preventDefault();
                 const turnover = parseFloat(document.getElementById('turnover-input').value) || 0;
                 const employees = parseInt(document.getElementById('employees-input').value) || 0;
                 const loss = (turnover * 0.02) + (employees * 1500);
                 const readiness = Math.min(100, Math.round(60 + (turnover / 500000) - (employees / 10)));
                 
                 document.getElementById('risk-results').innerHTML = `
                    <div><p class="text-gray-600" data-translate="potential_loss"></p><p class="text-3xl font-bold text-red-600">${Math.round(loss).toLocaleString('ro-RO')} MDL</p></div>
                    <div class="mt-4"><p class="text-gray-600" data-translate="insurance_readiness"></p><p class="text-3xl font-bold text-green-600">${readiness}%</p></div>`;
                 document.getElementById('risk-results-container').classList.remove('hidden');
                 setLanguage(currentLang);
             });
             setLanguage(currentLang);
        },

        vendor_chain: () => {
            const vendorList = document.getElementById('vendor-list');
            if(vendorList.innerHTML.trim() !== '' && vendorList.dataset.initialized) return;
            vendorList.innerHTML = '';
            vendorList.dataset.initialized = 'true';
            mockData.vendors.forEach(v => {
                 const row = document.createElement('tr');
                 row.className = 'border-b hover:bg-gray-50';
                 row.innerHTML = `<td class="p-3">${v.name}</td><td><span class="status-badge status-${v.status}" data-translate="status_${v.status}"></span></td>`;
                 vendorList.appendChild(row);
            });
            setLanguage(currentLang);
        },

        industry_shield: () => {
            const container = document.getElementById('shield-alerts-container');
            if(container.innerHTML.trim() !== '' && container.dataset.initialized) return;
            container.innerHTML = '';
            container.dataset.initialized = 'true';
            mockData.alerts.forEach(a => {
                const card = document.createElement('div');
                card.className = 'alert-card';
                card.innerHTML = `<p class="font-semibold" data-translate="${a.titleKey}"></p><p class="text-sm text-yellow-700" data-translate="${a.dateKey}"></p>`;
                container.appendChild(card);
            });
            setLanguage(currentLang);
        },

        training: () => {
             renderTrainingQuestion();
        },
        
        onboarding: () => {
            const employeeList = document.getElementById('employee-list');
            if(employeeList.innerHTML.trim() !== '' && employeeList.dataset.initialized) return;
            employeeList.innerHTML = '';
            employeeList.dataset.initialized = 'true';
            mockData.employees.forEach(emp => {
                const row = document.createElement('tr');
                row.className = 'border-b hover:bg-gray-50';
                row.innerHTML = `
                    <td class="p-3">${emp.name}</td>
                    <td class="p-3"><span class="status-badge ${emp.status === 'completed' ? 'status-green' : 'status-yellow'}" data-translate="onboarding_status_${emp.status}"></span></td>
                    <td class="p-3">${emp.date}</td>`;
                employeeList.appendChild(row);
            });
            setLanguage(currentLang);
        },

        policy_generator: () => {
            const policyList = document.getElementById('policy-list');
            if(policyList.innerHTML.trim() !== '' && policyList.dataset.initialized) return;
            policyList.innerHTML = '';
            policyList.dataset.initialized = 'true';
            mockData.policies.forEach(pol => {
                const card = document.createElement('div');
                card.className = 'policy-card';
                card.innerHTML = `
                    <i class="fa-solid ${pol.icon} mb-4"></i>
                    <h3 class="font-bold text-lg" data-translate="${pol.titleKey}"></h3>
                    <button class="btn btn-primary w-full mt-4" data-translate="policy_generate_button"></button>`;
                policyList.appendChild(card);
            });
            setLanguage(currentLang);
        },

        incident_drill: () => {
            const container = document.getElementById('drill-container');
            
            const renderDrillStep = (currentStep = 0) => {
                if (currentStep >= mockData.drillSteps.length) {
                    renderDrillResults();
                    return;
                }
                const step = mockData.drillSteps[currentStep];
                let contentHTML = `<div class="drill-step">
                    <h3 class="font-bold text-lg"><span data-translate="incident_drill_step"></span> ${currentStep + 1}: <span data-translate="${step.titleKey}"></span></h3>
                    <p class="mt-2" data-translate="${step.questionKey}"></p>`;
                
                if (step.optionsKeys) {
                    contentHTML += `<div class="mt-2 space-y-2">` + step.optionsKeys.map(key => `<button class="training-option" data-translate="${key}"></button>`).join('') + `</div>`;
                }
                if (step.inputPlaceholderKey) {
                    contentHTML += `<input type="text" class="input-field mt-2" data-translate-placeholder="${step.inputPlaceholderKey}">`;
                }
                
                if(!step.optionsKeys){
                    contentHTML += `<button class="btn btn-primary mt-3" data-translate="drill_continue_button"></button>`;
                }
                contentHTML += `</div>`;
                container.innerHTML = contentHTML;

                const nextStepFn = () => renderDrillStep(currentStep + 1);
                
                container.querySelectorAll('button').forEach(btn => btn.addEventListener('click', nextStepFn));
                setLanguage(currentLang);
            };

            const renderDrillResults = () => {
                 container.innerHTML = `<div class="text-center">
                    <h3 class="font-bold text-2xl text-green-600" data-translate="incident_drill_results_title"></h3>
                    <p class="mt-2" data-translate="drill_results_text"></p>
                    <button id="rerun-drill-btn" class="btn btn-secondary mt-4" data-translate="drill_rerun_button"></button>
                </div>`;
                document.getElementById('rerun-drill-btn').addEventListener('click', pageInitializers.incident_drill);
                setLanguage(currentLang);
            };

            container.innerHTML = `<div class="text-center"><p class="text-lg mb-4" data-translate="incident_drill_subtitle"></p><button id="start-drill-btn" class="btn btn-primary" data-translate="incident_drill_start_button"></button></div>`;
            document.getElementById('start-drill-btn').addEventListener('click', () => renderDrillStep(0));
            setLanguage(currentLang);
        },
    };

    // --- HELPER FUNCTIONS ---
    
    function displayScanResults(target, results) {
        const resultsContainer = document.getElementById('scan-results-container');
        resultsContainer.innerHTML = `
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h3 class="text-2xl font-bold"><span data-translate="scan_results_for"></span> <span class="text-indigo-600">${target}</span></h3>
                <button id="passport-btn" class="btn btn-secondary w-full sm:w-auto"><i class="fa-solid fa-file-shield"></i><span data-translate="passport_button"></span></button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-1 feature-card flex flex-col items-center justify-center">
                    <h4 class="text-lg font-semibold mb-3" data-translate="compliance_score"></h4>
                    <div class="relative w-40 h-40"><canvas id="compliance-chart"></canvas><div id="compliance-score-text" class="absolute inset-0 flex items-center justify-center text-4xl font-bold"></div></div>
                    <p id="compliance-status-text" class="mt-3 text-xl font-bold"></p>
                </div>
                <div id="scan-details" class="md-col-span-2 feature-card space-y-4"></div>
            </div>`;
        
        document.getElementById('passport-btn').addEventListener('click', () => {
            const passportContent = `<p class="mb-4" data-translate="passport_desc"></p><div class="border rounded-lg p-4"><h4 class="font-bold text-lg" data-translate="dynamics_title"></h4><canvas id="dynamics-chart" height="150"></canvas></div>`;
            showModal('passport_title', passportContent);
            new Chart(document.getElementById('dynamics-chart').getContext('2d'), {
                type: 'bar', data: { labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'], datasets: [{ label: 'Score', data: [65, 68, 75, 72, 80, 85], backgroundColor: '#4f46e5' }] },
                options: { scales: { y: { beginAtZero: true, max: 100 } } }
            });
        });

        const scoreText = document.getElementById('compliance-score-text');
        const statusText = document.getElementById('compliance-status-text');
        const detailsContainer = document.getElementById('scan-details');
        
        scoreText.textContent = `${results.score}%`;
        let statusKey, color;
        if (results.score >= 85) { statusKey = 'status_good'; color = '#10b981'; }
        else if (results.score >= 60) { statusKey = 'status_medium'; color = '#f59e0b'; }
        else { statusKey = 'status_weak'; color = '#ef4444'; }
        scoreText.style.color = color;
        statusText.dataset.translate = statusKey;

        if (complianceChart) complianceChart.destroy();
        complianceChart = new Chart(document.getElementById('compliance-chart').getContext('2d'), { type: 'doughnut', data: { datasets: [{ data: [results.score, 100 - results.score], backgroundColor: [color, '#e5e7eb'], borderWidth: 0 }] }, options: { cutout: '75%', plugins: { legend: { display: false }, tooltip: { enabled: false } } } });

        results.findings.forEach(finding => {
            const iconMap = { ok: 'fa-circle-check text-green-500', warn: 'fa-triangle-exclamation text-yellow-500', fail: 'fa-circle-xmark text-red-500' };
            const el = document.createElement('div');
            el.innerHTML = `
                <div class="flex items-start gap-3"><i class="fa-solid ${iconMap[finding.status]} mt-1"></i>
                <div><h5 class="font-semibold" data-translate="${finding.titleKey}"></h5><p class="text-sm text-gray-600" data-translate="${finding.detailsKey}"></p>
                <p class="text-sm text-blue-600 mt-1"><i><strong data-translate="finding_recommendation"></strong>: <span data-translate="${finding.recommendationKey}"></span></i></p></div></div>`;
            detailsContainer.appendChild(el);
        });
        setLanguage(currentLang);
    }
    
    function generateMockScanResults() {
        const score = Math.floor(Math.random() * 51) + 50;
        const findings = mockData.scanFindings.map(f => {
            let status = f.status || (score > f.statusOkThreshold ? 'ok' : 'fail');
            return { ...f, status };
        });
        return { score, findings };
    }
    
    function renderTrainingQuestion() {
        const trainingCard = document.getElementById('training-card');
        const q = mockData.trainingQuestions[Math.floor(Math.random() * mockData.trainingQuestions.length)];
        
        let optionsHTML = q.optionsKeys.map((optKey, index) => `<button class="training-option" data-index="${index}" data-translate="${optKey}"></button>`).join('');
        
        trainingCard.innerHTML = `
            <h3 class="font-semibold text-lg mb-4" data-translate="${q.questionKey}"></h3>
            <div class="space-y-2">${optionsHTML}</div>
            <div id="training-feedback" class="mt-4"></div>`;

        trainingCard.querySelectorAll('.training-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedIndex = parseInt(btn.dataset.index);
                const feedbackEl = document.getElementById('training-feedback');
                const resultKey = selectedIndex === q.correct ? 'correct_answer' : 'wrong_answer';
                const resultClass = selectedIndex === q.correct ? 'correct' : 'wrong';
                
                feedbackEl.innerHTML = `<div class="training-result ${resultClass}" data-translate="${resultKey}"></div>
                                      <button id="next-q-btn" class="btn btn-primary w-full mt-3" data-translate="next_question"></button>`;
                
                document.getElementById('next-q-btn').addEventListener('click', renderTrainingQuestion);
                setLanguage(currentLang);
            });
        });
        setLanguage(currentLang);
    }

    // --- APP INITIALIZATION ---
    
    router();
    setLanguage(currentLang);

    window.addEventListener('hashchange', router);
    document.getElementById('lang-switcher').addEventListener('click', e => {
        if (e.target.matches('.lang-btn')) {
            setLanguage(e.target.dataset.lang);
            router();
        }
    });
    modal.querySelector('#modal-close-btn').addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) hideModal();
    });

    // --- MOBILE MENU TOGGLE LOGIC ---
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    const toggleMenu = () => {
        sidebar.classList.toggle('is-open');
        overlay.classList.toggle('is-open');
    };

    menuToggleBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close sidebar when a nav link is clicked on mobile
    sidebar.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) { // Only affects mobile view
                toggleMenu();
            }
        });
    });
});