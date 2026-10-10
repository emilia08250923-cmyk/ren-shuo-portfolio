from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from pypdf import PdfReader
root = Path(__file__).resolve().parents[1]
output = root / 'public' / 'resume' / 'foldcraft-resume-template.pdf'
output.parent.mkdir(parents=True, exist_ok=True)
c = canvas.Canvas(str(output), pagesize=A4)
w,h = A4
c.setTitle('Foldcraft - Resume Template (Sample)')
c.setAuthor('Foldcraft')
c.setFillColor(HexColor('#F3F1EC')); c.rect(0,0,w,h,fill=1,stroke=0)
c.setFillColor(HexColor('#E95032')); c.setFont('Helvetica-Bold',9); c.drawString(48,h-48,'RESUME TEMPLATE / NOT A COMPLETED PERSONAL RESUME')
c.setFillColor(HexColor('#111111')); c.setFont('Helvetica-Bold',40); c.drawString(48,h-110,'YOUR NAME')
c.setFont('Helvetica',16); c.drawString(48,h-140,'Visual Designer & Video Creator')
c.setFont('Helvetica',10); c.drawString(48,h-168,'3067382469@qq.com  |  Add your location and portfolio URL')
c.setStrokeColor(HexColor('#CCC8BF')); c.line(48,h-192,w-48,h-192)
y=h-226
sections=[('PROFILE',['Add a short introduction describing your design practice,','specialisms, and the opportunities you are looking for.']),('EXPERIENCE',['YEAR - YEAR  /  COMPANY NAME','Position title','Add your responsibilities, contribution, and verified outcomes.']),('SELECTED PROJECTS',['PROJECT NAME  /  CATEGORY  /  YEAR','Describe the brief, your role, and the final deliverables.','Add a link to the project on your portfolio.']),('EDUCATION',['YEAR - YEAR  /  SCHOOL NAME','Degree and major']),('CAPABILITIES & TOOLS',['Add only the skills and software that reflect your experience.','Example fields: visual design, motion, editing, storytelling.'])]
for title,lines in sections:
 c.setFillColor(HexColor('#111111')); c.setFont('Helvetica-Bold',10); c.drawString(48,y,title); y-=25
 c.setFillColor(HexColor('#66645F')); c.setFont('Helvetica',11)
 for line in lines: c.drawString(48,y,line); y-=18
 y-=23
c.setFont('Helvetica',8); c.setFillColor(HexColor('#777777')); c.drawString(48,42,'Sample only. Replace all placeholders before using this document in an application.')
c.save()
r=PdfReader(output)
assert len(r.pages)==1 and 'NOT A COMPLETED' in r.pages[0].extract_text()
print(output)
