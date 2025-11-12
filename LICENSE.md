AI EMI Predictor — Comprehensive License

Copyright (c) 2025 tar-ang-2004

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

1. License Grant (MIT-compatible)

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

2. Disclaimer of Warranty

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

3. Additional Project Terms (Supplementary Conditions)

The sections below supplement the permissive license above and document
expectations and clarifications specific to the AI EMI Predictor project.
They are written to help contributors, deployers, and users understand
how to handle models, datasets, privacy-sensitive content, and third-party
components used by this project. The supplementary terms do not restrict
or alter the core MIT license grant above; they are explanatory and
contractual guidance intended for practical usage.

3.1 Data and Dataset Files

- The repository intentionally excludes raw datasets (the `Dataset/` folder is
  ignored by default). Where sample or synthetic data are included, they are
  provided for educational and testing purposes only.
- You may not redistribute any proprietary or third-party datasets included
  under their original distribution terms unless you are the holder of the
  required rights. The project maintainers assume no liability for dataset
  licensing issues in downstream redistribution.
- When using the project with your own datasets, ensure you comply with
  privacy regulations and data-sharing policies that apply to your locale
  (e.g., GDPR, CCPA, or other local laws).

3.2 Model Artifacts, Weights and Large Files

- Trained model artifacts included in `models/` (if present) are distributed
  under the same MIT-compatible terms, except where a separate notice file
  accompanies those artifacts (e.g., a model owner’s license or dataset
  restriction). Check `models/` for any README or license files that
  specifically govern those artifacts.
- If you retrain models and publish or distribute model weights derived from
  this code, you are encouraged to include a small README describing the
  training data sources, preprocessing steps, and any non-open data used.

3.3 Third-Party Libraries and Notices

- This project depends on multiple third-party open-source libraries (for
  example: scikit-learn, XGBoost, Flask, Chart.js, MLflow). Each dependency
  carries its own license. This project’s MIT-compatible license does not
  replace or override those component licenses.
- You are responsible for complying with the licenses of the libraries you
  use when deploying or redistributing this code. A non-exhaustive list of
  dependencies is included in `requirements.txt` — please consult that
  file and the dependency documentation for additional terms.

3.4 Patent Grant

To the extent that the contributors have rights to any patents that are
necessarily infringed by the use of the original work under this repository
as distributed, the contributors hereby grant you a perpetual, worldwide,
non-exclusive, no-charge, royalty-free, irrevocable (except as stated
below) license to make, use, sell, offer for sale, import, and otherwise
transfer the Work, subject to the terms of the MIT license above.

This patent grant does not apply to any contributor who opts to provide a
separate patent license or to assertions of patent infringement made by a
contributor against users or other contributors to this project.

3.5 Contributor Terms

By contributing code, documentation, or other materials to this repository,
you agree to license those contributions under the terms of this LICENSE.md
file (MIT-compatible). For significant contributions or where your
employer owns your contributions, you confirm you have the rights to grant
this license.

4. Privacy, Data Protection and User Data

- This project may process personal or sensitive information when used with
  real customer data. The authors are not responsible for how you collect,
  process, store, or share personal data. If you operate this project in
  production, you must ensure compliance with applicable privacy laws and
  implement appropriate security controls (encryption, access control,
  retention policy, logging, etc.).

- If you publish or share prediction logs, please ensure they are
  de-identified or that you have obtained consent to publish the data.

5. Security and Responsible Use

- The Software may be used to support financial decision making. The
  maintainers do not guarantee the suitability of predictions for financial
  decision-making, and automated predictions should not be relied upon as
  the sole basis for important financial decisions.

- You should implement appropriate review, human-in-the-loop checks, and
  business rules before using model outputs for customer-facing or
  regulatory-required activities.

- The maintainers are not responsible for any misuse of the software, and
  you agree to use the software responsibly and lawfully.

6. Trademark and Branding

- The project name, logos, and other branding elements are property of the
  repository owner unless otherwise stated. This license does not grant any
  right to use the project owner’s trademarks, logos, or trade names for
  endorsement without explicit permission.

7. Attribution and Citation

- If you use the project in academic publications, whitepapers, or
  presentations, please cite the project repository and include a brief
  acknowledgement. Example citation:

  Tarang Kishor (2025). AI-Powered EMI Risk Assessment. GitHub repository
  https://github.com/tar-ang-2004/AI-Powered-EMI-Risk-Assessment

8. Export Control

- You are responsible for ensuring compliance with any export control and
  economic sanctions laws that may apply to the distribution or use of
  encryption, machine learning models, or data across borders.

9. Governing Law

- This LICENSE.md is governed by the laws of the jurisdiction of the
  repository owner unless otherwise agreed in writing.

10. How to Apply this License to Your Project

Include this file at the top level of your project repository as
`LICENSE.md`. Add the following short header to source files where you want
to indicate the license explicitly (optional):

```
# Copyright (c) 2025 tar-ang-2004
# Licensed under the MIT License. See LICENSE.md for full text.
```

11. Contact

If you have questions about this license, or if you need an alternate
license for commercial integration, contact the repository owner:

- GitHub: https://github.com/tar-ang-2004
- Email: (use the contact on the repository profile)

---

Last updated: November 12, 2025
