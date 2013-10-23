#!/usr/bin/python
import os
from subprocess import call

if not os.path.exists('./transformed'):
	os.makedirs('./transformed')

for filename in os.listdir('.'):
    if not filename.endswith('.xml'): continue
    call(['transform', '-s:'+filename, '-xsl:transform.xsl', '-o:./transformed/'+filename])
