
function RegistrationManager(formId) {
    this.form = document.getElementById(formId);
    this.nameInput = document.getElementById('name');
    this.emailInput = document.getElementById('email');
    this.adharInput = document.getElementById('adhar');
    this.successMsg = document.getElementById('successMessage');
    this.tableBody = document.getElementById('dataTableBody');
    this.dataList = []; 

    this.init();
}


RegistrationManager.prototype.init = function() {
    this.form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (this.validate()) {
            this.saveData();
            this.renderTable();
            this.showSuccessAlert();
            this.form.reset();
            this.clearValidationClasses();
        } else {
            this.successMsg.classList.add('d-none');
        }
    }.bind(this));
};

RegistrationManager.prototype.validate = function() {
    let isValid = true;

    
    if (this.nameInput.value.trim() === '') {
        this.markInvalid(this.nameInput);
        isValid = false;
    } else {
        this.markValid(this.nameInput);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.emailInput.value.trim())) {
        this.markInvalid(this.emailInput);
        isValid = false;
    } else {
        this.markValid(this.emailInput);
    }

    
    const adharPattern = /^\d{12}$/;
    if (!adharPattern.test(this.adharInput.value.trim())) {
        this.markInvalid(this.adharInput);
        isValid = false;
    } else {
        this.markValid(this.adharInput);
    }

    return isValid;
};


RegistrationManager.prototype.markInvalid = function(input) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
};

RegistrationManager.prototype.markValid = function(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
};

RegistrationManager.prototype.clearValidationClasses = function() {
    [this.nameInput, this.emailInput, this.adharInput].forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
    });
};


RegistrationManager.prototype.saveData = function() {
    const user = {
        name: this.nameInput.value.trim(),
        email: this.emailInput.value.trim(),
        adhar: this.adharInput.value.trim()
    };
    this.dataList.push(user);
};

RegistrationManager.prototype.renderTable = function() {
    this.tableBody.innerHTML = '';
    this.dataList.forEach(user => {
        const row = `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.adhar}</td>
        </tr>`;
        this.tableBody.innerHTML += row;
    });
};

RegistrationManager.prototype.showSuccessAlert = function() {
    this.successMsg.classList.remove('d-none');
    setTimeout(() => {
        this.successMsg.classList.add('d-none');
    }, 4000); 
};


new RegistrationManager('registrationForm');