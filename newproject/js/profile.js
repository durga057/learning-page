document.addEventListener('DOMContentLoaded', () => {
    // Default User Data
    const defaultData = {
        name: "Durga",
        email: "example@email.com",
        phone: "1234567890",
        dept: "Computer Science",
        year: "3rd Year",
        semester: "6th Semester",
        address: "Your City, State",
        dob: "2005-01-01",
        gender: "Male",
        pfp: "images/pic1.jpg",
        studentId: "LEARN2025ST001",
        cgpa: "8.5",
        attendance: "85%",
        courses: "6",
        username: "durga_user",
        regNum: "REG2025001",
        lastLogin: new Date().toLocaleString()
    };

    // Initialize Data from LocalStorage
    let userData = JSON.parse(localStorage.getItem('studentProfile')) || defaultData;

    // Load Data into UI
    function updateUI() {
        // Headers
        document.querySelectorAll('.user-name').forEach(el => el.textContent = userData.name);
        document.querySelectorAll('.user-role').forEach(el => el.textContent = userData.year + " Student");
        document.querySelectorAll('.user-pfp').forEach(el => el.src = userData.pfp);

        // Details
        document.getElementById('profile-name').textContent = userData.name;
        document.getElementById('profile-email').textContent = userData.email;
        document.getElementById('profile-phone').textContent = userData.phone;
        document.getElementById('profile-dept').textContent = userData.dept;
        document.getElementById('profile-year').textContent = userData.year;
        document.getElementById('profile-sem').textContent = userData.semester;
        document.getElementById('profile-dob').textContent = userData.dob;
        document.getElementById('profile-gender').textContent = userData.gender;
        document.getElementById('profile-address').textContent = userData.address;
        document.getElementById('profile-sid').textContent = userData.studentId;

        // Academic
        document.getElementById('academic-cgpa').textContent = userData.cgpa;
        document.getElementById('academic-attendance').textContent = userData.attendance;
        document.getElementById('academic-courses').textContent = userData.courses;
        document.getElementById('academic-branch').textContent = userData.dept;

        // Account
        document.getElementById('account-username').textContent = userData.username;
        document.getElementById('account-reg').textContent = userData.regNum;
        document.getElementById('account-login').textContent = userData.lastLogin;
    }

    updateUI();

    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Modal Control
    const modal = document.getElementById('edit-modal');
    const editBtn = document.getElementById('open-edit-btn');
    const closeBtn = document.getElementById('close-modal-btn');
    const cancelBtn = document.getElementById('cancel-edit-btn');
    const editForm = document.getElementById('edit-profile-form');

    editBtn.addEventListener('click', () => {
        // Pre-fill form
        document.getElementById('edit-name').value = userData.name;
        document.getElementById('edit-email').value = userData.email;
        document.getElementById('edit-phone').value = userData.phone;
        document.getElementById('edit-dept').value = userData.dept;
        document.getElementById('edit-year').value = userData.year;
        document.getElementById('edit-sem').value = userData.semester;
        document.getElementById('edit-address').value = userData.address;
        document.getElementById('edit-dob').value = userData.dob;
        document.getElementById('edit-gender').value = userData.gender;
        document.getElementById('preview-image').src = userData.pfp;

        modal.classList.add('active');
    });

    const closeModal = () => modal.classList.remove('active');
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Profile Picture Handling
    const pfpInput = document.getElementById('edit-pfp');
    const previewImg = document.getElementById('preview-image');

    pfpInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                previewImg.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Form Submission
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validation
        const phone = document.getElementById('edit-phone').value;
        const email = document.getElementById('edit-email').value;

        if (phone.length < 10) {
            alert("Please enter a valid 10-digit phone number");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        // Save Data
        userData.name = document.getElementById('edit-name').value;
        userData.email = email;
        userData.phone = phone;
        userData.dept = document.getElementById('edit-dept').value;
        userData.year = document.getElementById('edit-year').value;
        userData.semester = document.getElementById('edit-sem').value;
        userData.address = document.getElementById('edit-address').value;
        userData.dob = document.getElementById('edit-dob').value;
        userData.gender = document.getElementById('edit-gender').value;
        userData.pfp = previewImg.src; // Using base64 from preview

        localStorage.setItem('studentProfile', JSON.stringify(userData));
        
        updateUI();
        closeModal();
        alert("Profile updated successfully!");
    });
});
