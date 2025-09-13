document.addEventListener('DOMContentLoaded', () => {
    // --- APP STATE ---
    let currentLang = localStorage.getItem('language') || 'ro';
    let complianceChart = null;
    let currentTrainingQuestion = null;

    // --- MOCK DATA STORE ---
    const mockData = {
        scanFindings: [
            { titleKey: 'finding_tls_title', statusOkThreshold: 80, detailsKey: 'finding_tls_details', recommendationKey: 'finding_tls_rec' },
            { titleKey: 'finding_email_auth_title', statusOkThreshold: 65, detailsKey: 'finding_email_auth_details', recommendationKey: 'finding_email_auth_rec' },
            { titleKey: 'finding_headers_title', status: 'warn', detailsKey: 'finding_headers_details', recommendationKey: 'finding_headers_rec' },
        ],
        checklist: [
            { sectionKey: "checklist_section_policies", questions: [{ id: 'q_pol_1', textKey: 'q_pol_1_text', law: 'Art. 11 lit. a)', type: 'mandatory', recKey: 'q_pol_1_rec' }] },
            { sectionKey: "checklist_section_risk", questions: [{ id: 'q_risk_1', textKey: 'q_risk_1_text', law: 'Art. 11 lit. b)', type: 'mandatory', recKey: 'q_risk_1_rec' }, { id: 'q_risk_2', textKey: 'q_risk_2_text', law: 'Art. 11 lit. b)', type: 'recommended', recKey: 'q_risk_2_rec' }] },
            { sectionKey: "checklist_section_monitoring", questions: [{ id: 'q_mon_1', textKey: 'q_mon_1_text', law: 'Art. 11 lit. c)', type: 'mandatory', recKey: 'q_mon_1_rec' }] },
            { sectionKey: "checklist_section_audit", questions: [{ id: 'q_aud_1', textKey: 'q_aud_1_text', law: 'Art. 11 lit. d)', type: 'mandatory', recKey: 'q_aud_1_rec' }] },
            { sectionKey: "checklist_section_logging", questions: [{ id: 'q_log_1', textKey: 'q_log_1_text', law: 'Art. 11 lit. e)', type: 'mandatory', recKey: 'q_log_1_rec' }] },
            { sectionKey: "checklist_section_continuity", questions: [{ id: 'q_cont_1', textKey: 'q_cont_1_text', law: 'Art. 11 lit. f)', type: 'mandatory', recKey: 'q_cont_1_rec' }] },
            { sectionKey: "checklist_section_events", questions: [{ id: 'q_event_1', textKey: 'q_event_1_text', law: 'Art. 11 lit. g)', type: 'mandatory', recKey: 'q_event_1_rec' }] },
            { sectionKey: "checklist_section_incident_plan", questions: [{ id: 'q_plan_1', textKey: 'q_plan_1_text', law: 'Art. 11 lit. h)', type: 'mandatory', recKey: 'q_plan_1_rec' }] },
            { sectionKey: "checklist_section_review", questions: [{ id: 'q_rev_1', textKey: 'q_rev_1_text', law: 'Art. 11 lit. i)', type: 'mandatory', recKey: 'q_rev_1_rec' }] }
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
        employees: [ { name: 'Ion Popescu', status: 'completed', date: '2025-08-15' }, { name: 'Maria Ionescu', status: 'pending', date: '-' } ],
        policies: [ { titleKey: 'policy_pass_title', icon: 'fa-key' }, { titleKey: 'policy_net_title', icon: 'fa-wifi' }, { titleKey: 'policy_incident_title', icon: 'fa-file-medical' } ],
        drillSteps: [ { titleKey: 'drill_step1_title', questionKey: 'drill_step1_q', optionsKeys: ['drill_step1_opt1', 'drill_step1_opt2'] }, { titleKey: 'drill_step2_title', questionKey: 'drill_step2_q', inputPlaceholderKey: 'drill_step2_placeholder' } ]
    };

    // --- DICTIONARIES AND TRANSLATIONS ---
    const translations = {
        ro: {
            nav_dashboard: "Panou de control", nav_checklist: "Listă Conformitate", nav_reporting: "Raportare Incident", nav_killer_features: "Funcționalități Cheie", nav_marketplace: "Piața Cyber-Help", nav_risk_calculator: "Calculator de Risc", nav_vendor_chain: "Lanț de Încredere", nav_industry_shield: "Scut de Industrie", nav_training: "Cyber-Antrenament", nav_proactive_defense: "Apărare Proactivă", nav_onboarding: "Integrare Angajați", nav_policy_generator: "Generator Politici", nav_incident_drill: "Simulare Incident",
            dashboard_title: "Panou de control Igienă Cibernetică", dashboard_subtitle: "Introduceți domeniul sau IP-ul pentru a efectua un audit de bază.", dashboard_scan_button: "Pornește Scanarea", scan_results_for: "Rezultate Audit pentru", compliance_score: "Scor de Conformitate", key_findings: "Constatări Cheie", scan_in_progress: "Scanare în desfășurare...", passport_button: "Descarcă Pașaport",
            passport_title: "Pașaport de Conformitate", passport_subtitle: "Validare pentru", passport_issued_on: "Data emiterii", passport_overall_score: "Scor General", passport_checks_performed: "Verificări efectuate", passport_validation_text: "Documentul confirmă că la data emiterii, domeniul menționat a trecut cu succes o scanare de bază a igienei cibernetice, conform politicilor interne.", passport_validator: "Validat de",
            dynamics_title: "Dinamica Îmbunătățirilor", status_good: "Bun", status_medium: "Mediu", status_weak: "Slab", finding_recommendation: "Recomandare", find_expert_button: "Găsește Expert",
            finding_tls_title: "Politici TLS/SSL", finding_tls_details: "TLS 1.2 & 1.3 activate. Certificat valid.", finding_tls_rec: "Dezactivați versiunile vechi de TLS (1.0, 1.1).", finding_email_auth_title: "Autentificare E-mail (SPF, DKIM)", finding_email_auth_details: "Înregistrare SPF găsită. Înregistrarea DKIM lipsește.", finding_email_auth_rec: "Configurați DKIM pentru a preveni spoofing-ul.", finding_headers_title: "Antete de Securitate Web", finding_headers_details: "Lipsește Content-Security-Policy.", finding_headers_rec: "Implementați un antet CSP strict.",
            disclaimer_title: "Notă de informare", disclaimer_text: "Scanarea domeniului public se bazează pe informații accesibile public, conform prevederilor Legii nr. 20/2023 privind securitatea cibernetică.",
            checklist_title: "Listă de Conformitate (Art. 11)", checklist_subtitle: "Evaluați nivelul de conformitate cu cerințele legale și bunele practici.", checklist_progress: "Progres Conformitate", badge_mandatory: "Obligatoriu", badge_recommended: "Recomandat", upload_evidence: "Încarcă dovadă", recommendation_title: "Recomandare:",
            checklist_section_policies: "Politici de Securitate", q_pol_1_text: "Există o politică de securitate a informației aprobată și comunicată angajaților?", q_pol_1_rec: "Elaborați și aprobați o politică de securitate. Asigurați-vă că este înțeleasă de toți angajații.",
            checklist_section_risk: "Gestionarea Riscurilor", q_risk_1_text: "Se efectuează o evaluare a riscurilor de securitate cibernetică cel puțin o dată pe an?", q_risk_1_rec: "Implementați un proces anual de evaluare a riscurilor pentru a identifica și prioritiza amenințările.", q_risk_2_text: "Există un registru al riscurilor care este actualizat periodic?", q_risk_2_rec: "Creați și mențineți un registru al riscurilor pentru a monitoriza evoluția acestora.",
            checklist_section_monitoring: "Monitorizare Continuă", q_mon_1_text: "Sistemele informatice și de comunicații sunt monitorizate în mod continuu pentru a detecta activități suspecte?", q_mon_1_rec: "Implementați o soluție de monitorizare (ex: SIEM) pentru a centraliza și analiza evenimentele de securitate.",
            checklist_section_audit: "Audit de Securitate", q_aud_1_text: "Se realizează audituri de securitate periodice (interne sau externe)?", q_aud_1_rec: "Planificați și executați audituri de securitate periodice pentru a valida controalele implementate.",
            checklist_section_logging: "Jurnalizare (Logging)", q_log_1_text: "Jurnalele (log-urile) de pe sistemele critice sunt colectate, centralizate și protejate împotriva modificărilor?", q_log_1_rec: "Configurați colectarea centralizată a jurnalelor și asigurați-vă că acestea sunt stocate în mod securizat.",
            checklist_section_continuity: "Continuitatea Afacerii", q_cont_1_text: "Există un plan de continuitate a afacerii și de recuperare în caz de dezastru (BCP/DRP) care este testat periodic?", q_cont_1_rec: "Elaborați și testați un plan BCP/DRP pentru a asigura funcționarea serviciilor esențiale în caz de incident major.",
            checklist_section_events: "Raportare Evenimente", q_event_1_text: "Există o procedură clară prin care angajații pot raporta evenimente de securitate?", q_event_1_rec: "Stabiliți și comunicați o procedură simplă pentru raportarea incidentelor de securitate de către angajați.",
            checklist_section_incident_plan: "Plan de Răspuns la Incidente", q_plan_1_text: "Există un plan formal de răspuns la incidente care definește roluri, responsabilități și pași de acțiune?", q_plan_1_rec: "Dezvoltați un plan de răspuns la incidente (IRP) și asigurați-vă că echipa responsabilă este instruită.",
            checklist_section_review: "Analiză Post-Incident", q_rev_1_text: "Se efectuează o analiză post-incident (post-mortem) după fiecare incident semnificativ pentru a identifica lecțiile învățate?", q_rev_1_rec: "Introduceți o practică de analiză post-incident pentru a îmbunătăți continuu procesul de răspuns.",
            reporting_title: "Raportare Incident (Art. 12)", reporting_subtitle: "Utilizați acest formular pentru a notifica un incident cibernetic.", incident_timeline_title: "Evoluția Incidentului", incident_form_title: "Formular Notificare", export_json_button: "Export JSON (Format Agenție)", timeline_initial: "Inițial", timeline_update: "Actualizare", timeline_final: "Final",
            field_impact: "Impact estimat", field_ioc: "Indicatori de compromitere (IoC)", field_systems: "Sistem(e) afectat(e)", field_measures: "Măsuri de remediere aplicate", field_significant_incident: "Incident semnificativ", field_recurrent_incident: "Incident recurent (≥2 în ultimele 6 luni)", report_submit: "Trimite Raport",
            marketplace_title: "Piața Cyber-Help", marketplace_subtitle: "Găsiți experți locali verificați.", contact_expert: "Contactează Expertul", spec_web_sec: "Securitate Web", spec_backup: "Backup & Recuperare", spec_net_sec: "Securitate Rețea", spec_email_sec: "Securitate Email",
            risk_calculator_title: "Calculator de Risc", risk_calculator_subtitle: "Transformați riscurile în estimări financiare.", calculate_risk: "Calculează Riscul", potential_loss: "Pierdere Potențială Anuală Estimată", insurance_readiness: "Index de Pregătire pentru Asigurare", industry: "Industrie", employees: "Nr. Angajați", turnover: "Cifra de afaceri (MDL)", industry_retail: "Retail", industry_it: "IT", industry_agri: "Agricultură", industry_const: "Construcții",
            vendor_chain_title: "Lanțul de Încredere", vendor_chain_subtitle: "Gestionați riscurile provenite de la parteneri.", invite_vendor: "Invită Furnizor", vendor_name: "Nume Furnizor", vendor_status: "Status", status_green: "Conform", status_yellow: "Necesită Atenție", status_red: "Risc Ridicat",
            industry_shield_title: "Scutul Industriei", industry_subtitle: "Primiți alerte specifice industriei dvs.", recent_alerts: "Alerte Recente", alert1_title: "Atac Phishing nou detectat în sectorul Agricol", alert2_title: "Vulnerabilitate critică în software-ul de contabilitate X", alert_date_2h: "Acum 2 ore", alert_date_1d: "Acum 1 zi",
            training_title: "Antrenament Cibernetic", training_subtitle: "Testează-ți cunoștințele. Este phishing sau nu?", submit_answer: "Trimite Răspuns", correct_answer: "Corect!", wrong_answer: "Greșit!", next_question: "Următoarea Întrebare", training_q1: "Ați primit un email de la 'banca-moldova@info.com' care vă cere să vă confirmați parola. Ce faceți?", training_q1_opt1: "Introduc parola", training_q1_opt2: "Șterg email-ul și îl raportez", training_q1_opt3: "Sun la bancă să verific", training_q2: "Un pop-up apare și spune 'Ați câștigat un iPhone! Click aici!'. Ce faceți?", training_q2_opt1: "Click pentru a revendica", training_q2_opt2: "Închid fereastra pop-up", training_q2_opt3: "Introduc datele mele",
            onboarding_title: "Integrarea Angajaților", onboarding_subtitle: "Asigurați-vă că fiecare nou membru primește instrucțiuni de bază.", onboarding_invite: "Invită Angajat", onboarding_employee: "Angajat", onboarding_status: "Status", onboarding_date: "Data finalizării", onboarding_status_completed: "Finalizat", onboarding_status_pending: "În așteptare",
            policy_generator_title: "Generator de Politici", policy_generator_subtitle: "Creați documente de securitate pentru compania dvs.", policy_generate_button: "Generează", policy_pass_title: "Politica de Parole", policy_net_title: "Politica de Utilizare a Internetului", policy_incident_title: "Plan de Răspuns la Incident",
            incident_drill_title: "Simulare de Incident", incident_drill_subtitle: "Testați pregătirea echipei dvs. printr-un exercițiu simulat.", incident_drill_start_button: "Începe Simularea", incident_drill_step: "Pasul", incident_drill_finish_button: "Finalizează", incident_drill_results_title: "Rezultatele Simulării", drill_step1_title: "Detecție", drill_step1_q: "Ați primit un email suspect. Ce faceți mai întâi?", drill_step1_opt1: "Izolez mașina și raportez", drill_step1_opt2: "Șterg email-ul", drill_step2_title: "Raportare", drill_step2_q: "Ați izolat problema. Unde raportați incidentul intern?", drill_step2_placeholder: "Numele persoanei/departamentului", drill_continue_button: "Continuă", drill_results_text: "Simulare finalizată. Timp de răspuns: 5 minute. Puncte de îmbunătățit: Clarificarea contactului intern.", drill_rerun_button: "Rulează din nou",
            smart_reporter_title: "Reporter Inteligent (AI)", smart_reporter_desc: "Descrieți incidentul în cuvinte simple. AI-ul va ajuta.", get_ai_help: "Obține Ajutor AI", ai_suggestion: "Sugestie AI", incident_placeholder: "ex: Site-ul nostru a fost spart...", ai_suggestion_text: "S-a detectat un incident de tip 'Web Defacement'. Se recomandă izolarea serverului și analiza log-urilor.",
        },
        ru: {
            nav_dashboard: "Панель управления", nav_checklist: "Чек-лист", nav_reporting: "Отчет об инциденте", nav_killer_features: "Ключевые функции", nav_marketplace: "Биржа Cyber-Help", nav_risk_calculator: "Калькулятор рисков", nav_vendor_chain: "Цепочка доверия", nav_industry_shield: "Отраслевой щит", nav_training: "Кибер-тренировка", nav_proactive_defense: "Проактивная защита", nav_onboarding: "Интеграция сотрудников", nav_policy_generator: "Генератор политик", nav_incident_drill: "Симуляция инцидента",
            dashboard_title: "Панель кибергигиены", dashboard_subtitle: "Введите домен или IP для проведения базового аудита.", dashboard_scan_button: "Начать сканирование", scan_results_for: "Результаты аудита для", compliance_score: "Оценка соответствия", key_findings: "Ключевые выводы", scan_in_progress: "Идет сканирование...", passport_button: "Скачать паспорт",
            passport_title: "Паспорт соответствия", passport_subtitle: "Подтверждение для", passport_issued_on: "Дата выдачи", passport_overall_score: "Общая оценка", passport_checks_performed: "Проведенные проверки", passport_validation_text: "Этот документ подтверждает, что на дату выдачи указанный домен успешно прошел базовое сканирование кибергигиены в соответствии с внутренними политиками.", passport_validator: "Подтверждено",
            dynamics_title: "Динамика улучшений", status_good: "Хорошо", status_medium: "Средне", status_weak: "Слабо", finding_recommendation: "Рекомендация", find_expert_button: "Найти эксперта",
            finding_tls_title: "Политики TLS/SSL", finding_tls_details: "TLS 1.2 и 1.3 активны. Сертификат действителен.", finding_tls_rec: "Отключите устаревшие версии TLS (1.0, 1.1).", finding_email_auth_title: "Аутентификация почты (SPF, DKIM)", finding_email_auth_details: "Найдена запись SPF. Запись DKIM отсутствует.", finding_email_auth_rec: "Настройте DKIM для предотвращения спуфинга.", finding_headers_title: "Заголовки веб-безопасности", finding_headers_details: "Отсутствует Content-Security-Policy.", finding_headers_rec: "Внедрите строгий заголовок CSP.",
            disclaimer_title: "Информационное уведомление", disclaimer_text: "Сканирование публичного домена основано на общедоступной информации в соответствии с Законом № 20/2023 о кибербезопасности.",
            checklist_title: "Чек-лист соответствия (Ст. 11)", checklist_subtitle: "Оцените уровень соответствия законодательным требованиям и лучшим практикам.", checklist_progress: "Прогресс соответствия", badge_mandatory: "Обязательно", badge_recommended: "Рекомендовано", upload_evidence: "Загрузить доказательство", recommendation_title: "Рекомендация:",
            checklist_section_policies: "Политики безопасности", q_pol_1_text: "Существует ли утвержденная и доведенная до сведения сотрудников политика информационной безопасности?", q_pol_1_rec: "Разработайте и утвердите политику безопасности. Убедитесь, что все сотрудники ее понимают.",
            reporting_title: "Отчет об инциденте (Ст. 12)", reporting_subtitle: "Используйте эту форму для уведомления о киберинциденте.", incident_timeline_title: "Хронология инцидента", incident_form_title: "Форма уведомления", export_json_button: "Экспорт в JSON (Формат Агентства)", timeline_initial: "Первичное", timeline_update: "Обновление", timeline_final: "Финальное",
            field_impact: "Предполагаемый ущерб", field_ioc: "Индикаторы компрометации (IoC)", field_systems: "Затронутые системы", field_measures: "Принятые меры по устранению", field_significant_incident: "Значительный инцидент", field_recurrent_incident: "Повторяющийся инцидент (≥2 за 6 мес.)", report_submit: "Отправить отчет",
            marketplace_title: "Биржа Cyber-Help", marketplace_subtitle: "Найдите проверенных местных экспертов.", contact_expert: "Связаться с экспертом", spec_web_sec: "Веб-безопасность", spec_backup: "Резервное копирование и восстановление", spec_net_sec: "Сетевая безопасность", spec_email_sec: "Безопасность электронной почты",
            risk_calculator_title: "Калькулятор рисков", risk_calculator_subtitle: "Преобразуйте риски в финансовые оценки.", calculate_risk: "Рассчитать риск", potential_loss: "Оценочный годовой потенциальный убыток", insurance_readiness: "Индекс готовности к страхованию", industry: "Отрасль", employees: "Кол-во сотрудников", turnover: "Оборот (MDL)", industry_retail: "Розничная торговля", industry_it: "IT", industry_agri: "Сельское хозяйство", industry_const: "Строительство",
            vendor_chain_title: "Цепочка доверия", vendor_chain_subtitle: "Управляйте рисками, исходящими от партнеров.", invite_vendor: "Пригласить поставщика", vendor_name: "Имя поставщика", vendor_status: "Статус", status_green: "Соответствует", status_yellow: "Требует внимания", status_red: "Высокий риск",
            industry_shield_title: "Отраслевой щит", industry_subtitle: "Получайте оповещения, специфичные для вашей отрасли.", recent_alerts: "Последние оповещения", alert1_title: "Обнаружена новая фишинговая атака в аграрном секторе", alert2_title: "Критическая уязвимость в бухгалтерском ПО X", alert_date_2h: "2 часа назад", alert_date_1d: "1 день назад",
            training_title: "Кибер-тренировка", training_subtitle: "Проверьте свои знания. Это фишинг или нет?", submit_answer: "Отправить ответ", correct_answer: "Правильно!", wrong_answer: "Неправильно!", next_question: "Следующий вопрос", training_q1: "Вы получили письмо от 'banca-moldova@info.com' с просьбой подтвердить ваш пароль. Что вы сделаете?", training_q1_opt1: "Введу пароль", training_q1_opt2: "Удалю письмо и сообщу о нем", training_q1_opt3: "Позвоню в банк для проверки", training_q2: "Появляется всплывающее окно с сообщением 'Вы выиграли iPhone! Нажмите здесь!'. Что вы сделаете?", training_q2_opt1: "Нажму, чтобы забрать приз", training_q2_opt2: "Закрою всплывающее окно", training_q2_opt3: "Введу свои данные",
            onboarding_title: "Интеграция сотрудников", onboarding_subtitle: "Убедитесь, что каждый новый член команды прошел базовый инструктаж.", onboarding_invite: "Пригласить сотрудника", onboarding_employee: "Сотрудник", onboarding_status: "Статус", onboarding_date: "Дата завершения", onboarding_status_completed: "Завершено", onboarding_status_pending: "В ожидании",
            policy_generator_title: "Генератор политик", policy_generator_subtitle: "Создайте базовые документы безопасности для вашей компании.", policy_generate_button: "Сгенерировать", policy_pass_title: "Политика паролей", policy_net_title: "Политика использования интернета", policy_incident_title: "План реагирования на инциденты",
            incident_drill_title: "Симуляция инцидента", incident_drill_subtitle: "Проверьте готовность вашей команды с помощью симуляции.", incident_drill_start_button: "Начать симуляцию", incident_drill_step: "Шаг", incident_drill_finish_button: "Завершить", incident_drill_results_title: "Результаты симуляции", drill_step1_title: "Обнаружение", drill_step1_q: "Вы получили подозрительное письмо. Что вы сделаете в первую очередь?", drill_step1_opt1: "Изолирую компьютер и сообщу", drill_step1_opt2: "Удалю письмо", drill_step2_title: "Сообщение", drill_step2_q: "Вы изолировали проблему. Кому внутри компании вы сообщите об инциденте?", drill_step2_placeholder: "Имя сотрудника/отдела", drill_continue_button: "Продолжить", drill_results_text: "Симуляция завершена. Время реакции: 5 минут. Точки для улучшения: Уточнение внутреннего контактного лица.", drill_rerun_button: "Запустить снова",
            smart_reporter_title: "Умный репортер (ИИ)", smart_reporter_desc: "Опишите инцидент простыми словами. ИИ поможет.", get_ai_help: "Получить помощь ИИ", ai_suggestion: "Предложение ИИ", incident_placeholder: "например: Наш сайт взломали...", ai_suggestion_text: "Обнаружен инцидент типа 'Web Defacement'. Рекомендуется изолировать сервер и проанализировать логи.",
        },
        en: {
            nav_dashboard: "Dashboard", nav_checklist: "Compliance Checklist", nav_reporting: "Incident Reporting", nav_killer_features: "Key Features", nav_marketplace: "Cyber-Help Marketplace", nav_risk_calculator: "Risk Calculator", nav_vendor_chain: "Vendor Chain", nav_industry_shield: "Industry Shield", nav_training: "Cyber-Training", nav_proactive_defense: "Proactive Defense", nav_onboarding: "Employee Onboarding", nav_policy_generator: "Policy Generator", nav_incident_drill: "Incident Drill",
            dashboard_title: "Cyber Hygiene Dashboard", dashboard_subtitle: "Enter your domain or IP to perform a basic audit.", dashboard_scan_button: "Start Scan", scan_results_for: "Audit Results for", compliance_score: "Compliance Score", key_findings: "Key Findings", scan_in_progress: "Scan in progress...", passport_button: "Download Passport",
            passport_title: "Compliance Passport", passport_subtitle: "Validation for", passport_issued_on: "Date of Issue", passport_overall_score: "Overall Score", passport_checks_performed: "Checks Performed", passport_validation_text: "This document confirms that as of the date of issue, the mentioned domain has successfully passed a basic cyber hygiene scan according to internal policies.", passport_validator: "Validated by",
            dynamics_title: "Improvement Dynamics", status_good: "Good", status_medium: "Medium", status_weak: "Weak", finding_recommendation: "Recommendation", find_expert_button: "Find Expert",
            finding_tls_title: "TLS/SSL Policies", finding_tls_details: "TLS 1.2 & 1.3 are active. Valid certificate.", finding_tls_rec: "Disable legacy TLS versions (1.0, 1.1).", finding_email_auth_title: "Email Authentication (SPF, DKIM)", finding_email_auth_details: "SPF record found. DKIM record is missing.", finding_email_auth_rec: "Configure DKIM to prevent spoofing.", finding_headers_title: "Web Security Headers", finding_headers_details: "Content-Security-Policy is missing.", finding_headers_rec: "Implement a strict CSP header.",
            disclaimer_title: "Information Notice", disclaimer_text: "Public domain scanning is based on publicly available information, in accordance with Law no. 20/2023 on cybersecurity.",
            checklist_title: "Compliance Checklist (Art. 11)", checklist_subtitle: "Assess your compliance level with legal requirements and best practices.", checklist_progress: "Compliance Progress", badge_mandatory: "Mandatory", badge_recommended: "Recommended", upload_evidence: "Upload Evidence", recommendation_title: "Recommendation:",
            reporting_title: "Incident Reporting (Art. 12)", reporting_subtitle: "Use this form to notify about a cybersecurity incident.", incident_timeline_title: "Incident Timeline", incident_form_title: "Notification Form", export_json_button: "Export JSON (Agency Format)", timeline_initial: "Initial", timeline_update: "Update", timeline_final: "Final",
            field_impact: "Estimated Impact", field_ioc: "Indicators of Compromise (IoC)", field_systems: "Affected System(s)", field_measures: "Remediation Measures Applied", field_significant_incident: "Significant Incident", field_recurrent_incident: "Recurrent Incident (≥2 in the last 6 months)", report_submit: "Submit Report",
            marketplace_title: "Cyber-Help Marketplace", marketplace_subtitle: "Find verified local experts.", contact_expert: "Contact Expert", spec_web_sec: "Web Security", spec_backup: "Backup & Recovery", spec_net_sec: "Network Security", spec_email_sec: "Email Security",
            risk_calculator_title: "Risk Calculator", risk_calculator_subtitle: "Turn abstract risks into financial estimates.", calculate_risk: "Calculate Risk", potential_loss: "Estimated Annual Potential Loss", insurance_readiness: "Insurance Readiness Index", industry: "Industry", employees: "Employees", turnover: "Turnover (MDL)", industry_retail: "Retail", industry_it: "IT", industry_agri: "Agriculture", industry_const: "Construction",
            vendor_chain_title: "Vendor Chain", vendor_chain_subtitle: "Manage risks from your partners.", invite_vendor: "Invite Vendor", vendor_name: "Vendor Name", vendor_status: "Status", status_green: "Compliant", status_yellow: "Needs Attention", status_red: "High Risk",
            industry_shield_title: "Industry Shield", industry_subtitle: "Get industry-specific security alerts.", recent_alerts: "Recent Alerts", alert1_title: "New Phishing attack detected in the Agricultural sector", alert2_title: "Critical vulnerability in accounting software X", alert_date_2h: "2 hours ago", alert_date_1d: "1 day ago",
            training_title: "Cyber-Training", training_subtitle: "Test your knowledge. Is it phishing or not?", submit_answer: "Submit Answer", correct_answer: "Correct!", wrong_answer: "Wrong!", next_question: "Next Question", training_q1: "You received an email from 'banca-moldova@info.com' asking you to confirm your password. What do you do?", training_q1_opt1: "Enter my password", training_q1_opt2: "Delete the email and report it", training_q1_opt3: "Call the bank to verify", training_q2: "A pop-up appears saying 'You've won an iPhone! Click here!'. What do you do?", training_q2_opt1: "Click to claim", training_q2_opt2: "Close the pop-up window", training_q2_opt3: "Enter my details",
            onboarding_title: "Employee Onboarding", onboarding_subtitle: "Ensure every new team member gets basic training.", onboarding_invite: "Invite Employee", onboarding_employee: "Employee", onboarding_status: "Status", onboarding_date: "Completion Date", onboarding_status_completed: "Completed", onboarding_status_pending: "Pending",
            policy_generator_title: "Policy Generator", policy_generator_subtitle: "Create basic security documents for your company.", policy_generate_button: "Generate", policy_pass_title: "Password Policy", policy_net_title: "Internet Usage Policy", policy_incident_title: "Incident Response Plan",
            incident_drill_title: "Incident Drill", incident_drill_subtitle: "Test your team's readiness with a simulation.", incident_drill_start_button: "Start Drill", incident_drill_step: "Step", incident_drill_finish_button: "Finish Drill", incident_drill_results_title: "Drill Results", drill_step1_title: "Detection", drill_step1_q: "You received a suspicious email. What do you do first?", drill_step1_opt1: "Isolate the machine and report", drill_step1_opt2: "Delete the email", drill_step2_title: "Reporting", drill_step2_q: "You have isolated the problem. Where do you report the incident internally?", drill_step2_placeholder: "Name of the person/department", drill_continue_button: "Continue", drill_results_text: "Drill complete. Response time: 5 minutes. Points to improve: Clarify internal contact.", drill_rerun_button: "Rerun Drill",
            smart_reporter_title: "Smart Reporter (AI)", smart_reporter_desc: "Describe the incident in your own words. AI will help.", get_ai_help: "Get AI Help", ai_suggestion: "AI Suggestion", incident_placeholder: "e.g., Our website was hacked...", ai_suggestion_text: "A 'Web Defacement' type incident has been detected. It is recommended to isolate the server and analyze the logs.",
        }
    };
    
    // --- CORE APP LOGIC ---
    const setLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.dataset.translate;
            if (translations[lang] && translations[lang][key]) { el.textContent = translations[lang][key]; }
        });
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.dataset.translatePlaceholder;
            if (translations[lang] && translations[lang][key]) { el.placeholder = translations[lang][key]; }
        });
        document.getElementById('lang-switcher').querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    };

    const router = () => {
        const hash = window.location.hash || '#dashboard';
        const pageId = hash.substring(1);
        document.querySelectorAll('.page-section').forEach(section => section.classList.toggle('active', section.id === pageId));
        document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.nav === pageId));
        const pageTitleEl = document.getElementById('page-title');
        const titleKey = `nav_${pageId}`;
        pageTitleEl.textContent = (translations[currentLang] && translations[currentLang][titleKey]) || 'CyberCare';
        if (typeof pageInitializers[pageId] === 'function') {
            pageInitializers[pageId]();
        }
    };
    
    // --- PAGE-SPECIFIC LOGIC & INITIALIZERS ---
    const pageInitializers = {
        dashboard: () => {
            const startScanBtn = document.getElementById('start-scan-btn');
            if (startScanBtn.dataset.listener) return;
            startScanBtn.addEventListener('click', () => {
                const target = document.getElementById('scan-target').value.trim() || 'exemplu.md';
                document.getElementById('scan-results-container').innerHTML = '';
                document.getElementById('loader-container').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('loader-container').classList.add('hidden');
                    const results = generateMockScanResults();
                    displayScanResults(target, results);
                }, 1500);
            });
            startScanBtn.dataset.listener = 'true';
        },
        
        checklist: () => {
            const form = document.getElementById('compliance-form');
            if (form.dataset.initialized) return;
            form.innerHTML = '';
            let totalQuestions = 0;
            mockData.checklist.forEach(sectionData => {
                const sectionEl = document.createElement('div');
                const title = document.createElement('h4');
                title.className = 'text-lg font-semibold mb-3 border-b pb-2';
                title.dataset.translate = sectionData.sectionKey;
                sectionEl.appendChild(title);
                sectionData.questions.forEach(q => {
                    totalQuestions++;
                    const itemEl = document.createElement('div');
                    itemEl.className = 'checklist-item space-y-3';
                    const badgeClass = q.type === 'mandatory' ? 'badge-mandatory' : 'badge-recommended';
                    const badgeTextKey = q.type === 'mandatory' ? 'badge_mandatory' : 'badge_recommended';
                    itemEl.innerHTML = `
                        <div class="flex justify-between items-start">
                            <div>
                                <label class="font-semibold text-gray-800" data-translate="${q.textKey}"></label>
                                <span class="legal-badge ${badgeClass}" data-translate="${badgeTextKey}"></span>
                                <span class="text-xs text-gray-500">${q.law}</span>
                            </div>
                            <div class="flex gap-4">
                                <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="${q.id}" value="yes" class="h-4 w-4"> Da</label>
                                <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="${q.id}" value="no" class="h-4 w-4"> Nu</label>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <button class="evidence-upload-btn" data-translate="upload_evidence"><i class="fa-solid fa-paperclip text-sm mr-1"></i> </button>
                        </div>
                        <div id="rec-${q.id}" class="recommendation-box hidden">
                            <strong><i class="fa-solid fa-lightbulb"></i> <span data-translate="recommendation_title"></span></strong>
                            <span data-translate="${q.recKey}"></span>
                        </div>`;
                    sectionEl.appendChild(itemEl);
                });
                form.appendChild(sectionEl);
            });
            const updateProgress = () => {
                const checkedYesCount = form.querySelectorAll('input[value="yes"]:checked').length;
                const percentage = totalQuestions > 0 ? Math.round((checkedYesCount / totalQuestions) * 100) : 0;
                document.getElementById('checklist-progress-bar').style.width = `${percentage}%`;
                document.getElementById('checklist-progress-text').textContent = `${percentage}%`;
            };
            form.addEventListener('change', e => {
                if(e.target.type === 'radio') {
                    const recBox = document.getElementById(`rec-${e.target.name}`);
                    recBox.classList.toggle('hidden', e.target.value !== 'no');
                    updateProgress();
                }
            });
            updateProgress();
            form.dataset.initialized = 'true';
            setLanguage(currentLang);
        },
        
        reporting: () => {
            const timelineContainer = document.getElementById('incident-timeline');
            const form = document.getElementById('incident-report-form');
            if (timelineContainer.dataset.initialized) return;
            const stages = ['initial', 'update', 'final'];
            timelineContainer.innerHTML = stages.map(stage => `
                <div class="timeline-step" id="timeline-${stage}">
                    <div class="timeline-dot"></div>
                    <p class="timeline-label" data-translate="timeline_${stage}"></p>
                </div>`).join('');
            const updateTimeline = currentStage => {
                 stages.forEach((stage, index) => {
                    const stepEl = document.getElementById(`timeline-${stage}`);
                    stepEl.classList.remove('active', 'completed');
                    const currentStageIndex = stages.indexOf(currentStage);
                    if (index < currentStageIndex) { stepEl.classList.add('completed'); } 
                    else if (index === currentStageIndex) { stepEl.classList.add('active'); }
                });
            };
            form.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="impact" class="font-medium" data-translate="field_impact"></label><input type="text" id="impact" class="input-field mt-1"></div>
                    <div><label for="systems" class="font-medium" data-translate="field_systems"></label><input type="text" id="systems" class="input-field mt-1"></div>
                </div>
                <div><label for="ioc" class="font-medium" data-translate="field_ioc"></label><textarea id="ioc" class="input-field mt-1" rows="3"></textarea></div>
                <div><label for="measures" class="font-medium" data-translate="field_measures"></label><textarea id="measures" class="input-field mt-1" rows="3"></textarea></div>
                <div class="flex items-center gap-6 mt-2">
                    <label class="flex items-center gap-2"><input type="checkbox" id="significant" class="h-4 w-4"><span data-translate="field_significant_incident"></span></label>
                    <label class="flex items-center gap-2"><input type="checkbox" id="recurrent" class="h-4 w-4"><span data-translate="field_recurrent_incident"></span></label>
                </div>
                 <button type="submit" class="btn btn-primary w-full mt-4" data-translate="report_submit"></button>`;
            if (!form.dataset.listener) {
                form.addEventListener('submit', e => { e.preventDefault(); alert('Raport trimis (simulare).'); });
                form.dataset.listener = 'true';
            }
            updateTimeline('initial');
            timelineContainer.dataset.initialized = 'true';
            setLanguage(currentLang);
        },

        training: () => {
            const trainingCard = document.getElementById('training-card');
            trainingCard.className = 'card-minimal max-w-2xl mx-auto'; // Apply new class
            if (!trainingCard.dataset.listener) {
                trainingCard.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = e.target.closest('a.training-option-link'); // Target links now
                    if (target) {
                        const selectedIndex = parseInt(target.dataset.index);
                        const feedbackEl = document.getElementById('training-feedback');
                        if (!currentTrainingQuestion || !feedbackEl) return;
                        const resultKey = selectedIndex === currentTrainingQuestion.correct ? 'correct_answer' : 'wrong_answer';
                        const resultClass = selectedIndex === currentTrainingQuestion.correct ? 'correct' : 'wrong';
                        feedbackEl.innerHTML = `<div class="training-result ${resultClass}" data-translate="${resultKey}"></div>
                                              <button id="next-q-btn" class="btn btn-primary w-full mt-3" data-translate="next_question"></button>`;
                        setLanguage(currentLang);
                    }
                    if (e.target.matches('#next-q-btn')) {
                        renderTrainingQuestion();
                    }
                });
                trainingCard.dataset.listener = 'true';
            }
            renderTrainingQuestion();
        },

        marketplace: () => {
            const grid = document.getElementById('marketplace-grid');
            if (grid.dataset.initialized) return;
            grid.innerHTML = '';
            mockData.experts.forEach(expert => {
                const card = document.createElement('div');
                card.className = 'card-minimal text-left'; // Apply new minimal card style
                card.innerHTML = `
                    <h3 class="font-bold text-xl">${expert.name}</h3>
                    <p class="text-gray-500" data-translate="${expert.specKey}"></p>
                    <div class="flex items-center gap-1 text-yellow-500 my-2"><i class="fa-solid fa-star"></i> ${expert.rating}</div>
                    <button class="btn btn-primary w-full mt-3" data-translate="contact_expert"></button>`;
                grid.appendChild(card);
            });
            grid.dataset.initialized = 'true';
            setLanguage(currentLang);
        },

        vendor_chain: () => {
            const vendorListContainer = document.querySelector('#vendor_chain .feature-card');
            if (vendorListContainer.dataset.initialized) return;
            
            vendorListContainer.innerHTML = `
                <div class="vendor-list">
                    <div class="vendor-list-row font-semibold">
                        <span data-translate="vendor_name"></span>
                        <span data-translate="vendor_status"></span>
                    </div>
                </div>
            `;
            const vendorList = vendorListContainer.querySelector('.vendor-list');
            mockData.vendors.forEach(v => {
                const row = document.createElement('div');
                row.className = 'vendor-list-row';
                row.innerHTML = `<span>${v.name}</span><span class="status-badge status-${v.status}" data-translate="status_${v.status}"></span>`;
                vendorList.appendChild(row);
            });

            vendorListContainer.dataset.initialized = 'true';
            setLanguage(currentLang);
        },

        industry_shield: () => {
            const container = document.getElementById('shield-alerts-container');
            if (container.dataset.initialized) return;
            container.innerHTML = '';
            mockData.alerts.forEach(a => {
                const card = document.createElement('div');
                card.className = 'alert-card';
                card.innerHTML = `<p data-translate="${a.titleKey}"></p><p data-translate="${a.dateKey}"></p>`;
                container.appendChild(card);
            });
            container.dataset.initialized = 'true';
            setLanguage(currentLang);
        },
        
        risk_calculator: () => {
            const form = document.getElementById('risk-form');
            if (form.dataset.listener) return;
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
            form.dataset.listener = 'true';
            setLanguage(currentLang);
        },

        onboarding: () => {
            const container = document.querySelector('#onboarding .feature-card');
            if (container.dataset.initialized) return;
            container.innerHTML = `
                <table class="w-full">
                    <thead><tr class="border-b"><th class="text-left p-3" data-translate="onboarding_employee"></th><th class="text-left p-3" data-translate="onboarding_status"></th><th class="text-left p-3" data-translate="onboarding_date"></th></tr></thead>
                    <tbody id="employee-list"></tbody>
                </table>
            `;
            const employeeList = document.getElementById('employee-list');
            mockData.employees.forEach(emp => {
                const row = document.createElement('tr');
                row.className = 'border-b hover:bg-gray-50';
                row.innerHTML = `
                    <td class="p-3">${emp.name}</td>
                    <td class="p-3"><span class="status-badge ${emp.status === 'completed' ? 'status-green' : 'status-yellow'}" data-translate="onboarding_status_${emp.status}"></span></td>
                    <td class="p-3">${emp.date}</td>`;
                employeeList.appendChild(row);
            });
            container.dataset.initialized = 'true';
            setLanguage(currentLang);
        },

        policy_generator: () => {
            const policyList = document.getElementById('policy-list');
            if (policyList.dataset.initialized) return;
            policyList.innerHTML = '';
            mockData.policies.forEach(pol => {
                const card = document.createElement('div');
                card.className = 'feature-card text-center';
                card.innerHTML = `
                    <i class="fa-solid ${pol.icon} fa-2x text-indigo-500 mb-4"></i>
                    <h3 class="font-bold text-lg" data-translate="${pol.titleKey}"></h3>
                    <button class="btn btn-secondary w-full mt-4" data-translate="policy_generate_button"></button>`;
                policyList.appendChild(card);
            });
            policyList.dataset.initialized = 'true';
            setLanguage(currentLang);
        },

        incident_drill: () => {
            const container = document.getElementById('drill-container');
            if (container.dataset.initialized) return;
            const renderDrillStep = (currentStep = 0) => {
                if (currentStep >= mockData.drillSteps.length) { renderDrillResults(); return; }
                const step = mockData.drillSteps[currentStep];
                let contentHTML = `<div class="drill-step">
                    <h3 class="font-bold text-lg"><span data-translate="incident_drill_step"></span> ${currentStep + 1}: <span data-translate="${step.titleKey}"></span></h3>
                    <p class="mt-2" data-translate="${step.questionKey}"></p>`;
                if (step.optionsKeys) { contentHTML += `<div class="mt-2 space-y-2">` + step.optionsKeys.map(key => `<button class="training-option" data-translate="${key}"></button>`).join('') + `</div>`; }
                if (step.inputPlaceholderKey) { contentHTML += `<input type="text" class="input-field mt-2" data-translate-placeholder="${step.inputPlaceholderKey}">`; }
                if(!step.optionsKeys){ contentHTML += `<button class="btn btn-primary mt-3" data-translate="drill_continue_button"></button>`; }
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
                document.getElementById('rerun-drill-btn').addEventListener('click', () => {
                    container.dataset.initialized = ''; // Reset for re-run
                    pageInitializers.incident_drill();
                });
                setLanguage(currentLang);
            };
            container.innerHTML = `<div class="text-center"><p class="text-lg mb-4" data-translate="incident_drill_subtitle"></p><button id="start-drill-btn" class="btn btn-primary" data-translate="incident_drill_start_button"></button></div>`;
            document.getElementById('start-drill-btn').addEventListener('click', () => renderDrillStep(0));
            container.dataset.initialized = 'true';
            setLanguage(currentLang);
        },
    };

    // --- HELPER FUNCTIONS ---
    function renderTrainingQuestion() {
        const trainingCard = document.getElementById('training-card');
        currentTrainingQuestion = mockData.trainingQuestions[Math.floor(Math.random() * mockData.trainingQuestions.length)];
        let optionsHTML = currentTrainingQuestion.optionsKeys.map((optKey, index) => 
            `<a href="#" class="training-option-link" data-index="${index}" data-translate="${optKey}"></a>`
        ).join('');
        trainingCard.innerHTML = `
            <h3 class="font-semibold text-xl mb-6" data-translate="${currentTrainingQuestion.questionKey}"></h3>
            <div class="mt-4 text-base">${optionsHTML}</div>
            <div id="training-feedback" class="mt-6"></div>`;
        setLanguage(currentLang);
    }
    
    function displayScanResults(target, results) {
        const container = document.getElementById('scan-results-container');
        const scoreColor = results.score > 85 ? 'text-green-600' : results.score > 60 ? 'text-yellow-600' : 'text-red-600';

        let findingsHTML = results.findings.map(finding => {
            const statusIcon = finding.status === 'ok' ? '<i class="fa-solid fa-check-circle text-green-500"></i>' : '<i class="fa-solid fa-exclamation-triangle text-red-500"></i>';
            return `
                <div class="p-4 border rounded-lg bg-white">
                    <div class="flex items-center justify-between">
                        <h4 class="font-semibold" data-translate="${finding.titleKey}"></h4>
                        ${statusIcon}
                    </div>
                    <p class="text-sm text-gray-600 my-2" data-translate="${finding.detailsKey}"></p>
                    <div class="bg-gray-50 p-3 rounded-md">
                        <p class="text-sm font-semibold text-indigo-700"><i class="fa-solid fa-lightbulb"></i> <span data-translate="finding_recommendation"></span></p>
                        <p class="text-sm" data-translate="${finding.recommendationKey}"></p>
                    </div>
                </div>`;
        }).join('');

        container.innerHTML = `
            <h3 class="text-2xl font-bold mb-4"><span data-translate="scan_results_for"></span> <span class="text-indigo-600">${target}</span></h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-1 feature-card text-center flex flex-col justify-center">
                    <p class="text-lg font-semibold" data-translate="compliance_score"></p>
                    <p class="text-6xl font-bold ${scoreColor} my-2">${results.score}%</p>
                    <button id="download-passport-btn" class="btn btn-secondary mt-4 w-full"><i class="fa-solid fa-file-pdf"></i> <span data-translate="passport_button"></span></button>
                </div>

                <div class="md:col-span-2 feature-card">
                    <h4 class="text-lg font-semibold mb-4" data-translate="key_findings"></h4>
                    <div class="space-y-4">${findingsHTML}</div>
                </div>
            </div>

            <div class="feature-card mt-6">
                 <h4 class="text-lg font-semibold mb-4" data-translate="dynamics_title"></h4>
                 <canvas id="complianceChart"></canvas>
            </div>
        `;

        // Add Passport Button Event Listener
        document.getElementById('download-passport-btn').addEventListener('click', () => {
            showPassportModal(target, results);
        });


        // Render Chart
        const ctx = document.getElementById('complianceChart').getContext('2d');
        if (complianceChart) {
            complianceChart.destroy();
        }
        complianceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun'],
                datasets: [{
                    label: 'Scor',
                    data: [65, 59, 80, 81, 76, results.score],
                    fill: false,
                    borderColor: 'rgb(79, 70, 229)',
                    tension: 0.1
                }]
            }
        });

        setLanguage(currentLang);
    }
    
    function generateMockScanResults() {
        const score = Math.floor(Math.random() * 51) + 50;
        const findings = mockData.scanFindings.map(f => ({ ...f, status: f.status || (score > f.statusOkThreshold ? 'ok' : 'fail') }));
        return { score, findings };
    }

    function showPassportModal(target, results) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');

        modalTitle.dataset.translate = 'passport_title';
        
        const checksHTML = results.findings.map(f => `<li class="flex items-center gap-2"><i class="fa-solid fa-check text-green-500"></i> <span data-translate="${f.titleKey}"></span></li>`).join('');

        modalContent.innerHTML = `
            <div class="text-center mb-4">
                <p class="text-sm text-gray-500" data-translate="passport_subtitle"></p>
                <p class="text-2xl font-bold text-gray-800">${target}</p>
            </div>
            <div class="grid grid-cols-2 gap-6 my-6">
                <div>
                    <p class="text-sm font-semibold" data-translate="passport_issued_on"></p>
                    <p>${new Date().toLocaleDateString('ro-RO')}</p>
                </div>
                <div class="text-right">
                    <p class="text-sm font-semibold" data-translate="passport_overall_score"></p>
                    <p class="text-2xl font-bold ${results.score > 85 ? 'text-green-600' : 'text-yellow-600'}">${results.score}%</p>
                </div>
            </div>
            <div>
                <h4 class="font-semibold mb-2" data-translate="passport_checks_performed"></h4>
                <ul class="space-y-1 text-gray-700">${checksHTML}</ul>
            </div>
            <div class="mt-6 pt-4 border-t">
                <p class="text-xs text-gray-600 italic text-center" data-translate="passport_validation_text"></p>
            </div>
            <div class="mt-8 text-center">
                <p class="text-sm" data-translate="passport_validator"></p>
                <p class="font-serif text-lg font-semibold">CyberCare Digital Services</p>
            </div>
        `;
        
        modal.classList.add('active');
        setLanguage(currentLang);
    }

    // --- APP INITIALIZATION & EVENT LISTENERS ---
    const modal = document.getElementById('modal');
    router();
    setLanguage(currentLang);
    window.addEventListener('hashchange', router);
    document.getElementById('lang-switcher').addEventListener('click', e => {
        if (e.target.matches('.lang-btn')) { setLanguage(e.target.dataset.lang); router(); }
    });
    modal.querySelector('#modal-close-btn').addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });

    // Mobile Menu
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const toggleMenu = () => {
        sidebar.classList.toggle('is-open');
        overlay.classList.toggle('is-open');
    };
    menuToggleBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    sidebar.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => { if (window.innerWidth < 768) { toggleMenu(); } });
    });
});